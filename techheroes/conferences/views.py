from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status, generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from heroes.models import Hero

from .models import Conference, ConferenceLog
from .permissions import IsOwnerOrStaff
from .serializers import ConferenceListSerializer, ConferenceDetailSerializer


class ListConferencesView(generics.ListAPIView):
    serializer_class = ConferenceListSerializer

    def get_queryset(self):
        return Conference.objects.filter(
            Q(call_request__user=self.request.user) | Q(call_request__hero__user=self.request.user))


class RetrieveConferenceView(generics.RetrieveAPIView):
    serializer_class = ConferenceDetailSerializer
    permission_classes = (IsAuthenticated, IsOwnerOrStaff)

    def get_queryset(self):
        return Conference.objects.filter(
            Q(call_request__user=self.request.user) | Q(call_request__hero__user=self.request.user))









