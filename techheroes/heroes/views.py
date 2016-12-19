from django.db import IntegrityError
from rest_framework import status, generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from accounts.permissions import StaffOnly
from utils.mixins import AtomicMixin

from .models import Hero, HeroAcceptAction
from .permissions import IsHeroOrStaff, VerifiedEmailandPhone
from .serializers import (CreateHeroSerializer, UpdateHeroSerializer, HeroProfileSerializer,
    AcceptDeclineHeroSerializer, HeroAcceptActionSerializer, HeroSerializer, HeroDetailSerializer)


class ApplyForHeroView(AtomicMixin, generics.GenericAPIView):
    """
    POST: Create a new Hero instance that awaits acceptance
    """
    serializer_class = CreateHeroSerializer
    permission_classes = (IsAuthenticated, VerifiedEmailandPhone)

    def post(self, request, *args, **kwargs):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        try:
            new_hero = Hero.objects.create_hero(user=request.user, data=data.validated_data)
        except IntegrityError:
            error = {'detail': 'User has already applied to become a Hero.'}
            return Response(error, status=status.HTTP_409_CONFLICT)

        serializer = HeroSerializer(new_hero)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RetrieveUpdateHeroView(generics.RetrieveUpdateAPIView):
    serializer_class = HeroProfileSerializer

    def get_object(self):
        if self.request.user.is_hero():
            return self.request.user.hero
        else:
            raise PermissionDenied(detail='User is not a hero.')

    def patch(self, request, *args, **kwargs):
        data = UpdateHeroSerializer(data=request.data)
        data.is_valid(raise_exception=True)

        hero = self.get_object()
        for key, value in data.validated_data.items():
            setattr(hero, key, value)

        hero.save()
        serializer = HeroProfileSerializer(hero)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AcceptHeroView(generics.CreateAPIView):
    serializer_class = AcceptDeclineHeroSerializer
    permission_classes = (StaffOnly,)

    def post(self, request, *args, **kwargs):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        hero = Hero.objects.get(id=data.validated_data['hero_id'])
        if hero.accepted:
            error = {'detail': 'Hero is already accepted.'}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        hero.accepted = True
        hero.save()

        hero.send_acceptance_email()

        accept_action = HeroAcceptAction.objects.create(user=request.user, hero=hero, accepted=hero.accepted)
        serializer = HeroAcceptActionSerializer(accept_action)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeclineHeroView(generics.CreateAPIView):
    serializer_class = AcceptDeclineHeroSerializer
    permission_classes = (StaffOnly,)

    def post(self, request, *args, **kwargs):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        hero = Hero.objects.get(id=data.validated_data['hero_id'])
        if not hero.accepted:
            error = {'detail': 'Hero is already declined.'}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        hero.accepted = False
        hero.save()

        accept_action = HeroAcceptAction.objects.create(user=request.user, hero=hero, accepted=hero.accepted)
        serializer = HeroAcceptActionSerializer(accept_action)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetHeroListView(generics.ListAPIView):
    serializer_class = HeroSerializer
    permission_classes = (AllowAny,)
    queryset = Hero.objects.filter(accepted=True, active=True)


class GetHeroDetailView(generics.RetrieveAPIView):
    serializer_class = HeroDetailSerializer
    permission_classes = (AllowAny,)
    queryset = Hero.objects.filter(accepted=True, active=True)
