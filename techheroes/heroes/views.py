from rest_framework import status, generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from accounts.models import User
from accounts.permissions import StaffOnly
from utils.mixins import AtomicMixin

from .models import Hero, HeroAcceptAction
from .permissions import IsHeroOrStaff
from .serializers import (CreateUpdateHeroSerializer, HeroWithTokenSerializer, AcceptDeclineHeroSerializer,
    HeroAcceptActionSerializer)


class ApplyForHeroView(AtomicMixin, generics.GenericAPIView):
    """
    POST: Create a new Hero instance that awaits acceptance
    """
    serializer_class = CreateUpdateHeroSerializer

    def post(self, request, *args, **kwargs):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        new_hero = Hero.objects.create(user=request.user, **data.validated_data)
        serializer = HeroWithTokenSerializer(new_hero)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RetrieveUpdateHeroView(generics.RetrieveUpdateAPIView):
    serializer_class = HeroWithTokenSerializer

    def get_object(self):
        if self.request.user.is_hero():
            return self.request.user.hero
        else:
            raise PermissionDenied(detail='User is not a hero.')

    def patch(self, request, *args, **kwargs):
        data = CreateUpdateHeroSerializer(data=request.data)
        data.is_valid(raise_exception=True)

        hero = self.get_object()
        for key, value in data.validated_data.items():
            setattr(hero, key, value)

        hero.save()
        serializer = HeroWithTokenSerializer(hero)
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
