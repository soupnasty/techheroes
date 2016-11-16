from rest_framework import status, generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from accounts.models import User
from utils.mixins import AtomicMixin

from .models import Hero
from .permissions import IsHeroOrStaff
from .serializers import CreateUpdateHeroSerializer, HeroWithTokenSerializer


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


