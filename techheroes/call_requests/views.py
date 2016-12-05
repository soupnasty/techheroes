from django.db import IntegrityError
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status, generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from accounts.models import User
from heroes.models import Hero
from heroes.permissions import IsHeroOrStaff

from .models import CallRequest, TimeSuggestion
from .permissions import IsOwnerOrStaff
from .serializers import (CreateCallRequestSerializer, CallRequestSerializer,
    TimesSerializer, DeclineReasonSerializer, AgreedTimeSerializer)


class CreateListCallRequestView(generics.ListCreateAPIView):
    """
    POST: Create a call request instance
    GET: Get a list of call requests related to the user
    """
    serializer_class = CallRequestSerializer

    def get_queryset(self):
        if self.request.user.is_hero():
            return CallRequest.objects.filter(hero=self.request.user.hero)
        else:
            return CallRequest.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        data = CreateCallRequestSerializer(data=request.data)
        data.is_valid(raise_exception=True)

        # Uncomment this when verification is needed
        # if not request.user.email_verified:
        #     error = {'detail': 'User must have a verified email address.'}
        #     return Response(error, status=status.HTTP_403_FORBIDDEN)
        #
        # if not request.user.phone_verified:
        #     error = {'detail': 'User must have a verified phone number.'}
        #     return Response(error, status=status.HTTP_403_FORBIDDEN)
        #
        # if not request.user.payment_verified:
        #     error = {'detail': 'User must have a verified payment method.'}
        #     return Response(error, status=status.HTTP_403_FORBIDDEN)

        hero = Hero.objects.get(id=data.validated_data['hero_id'])
        if CallRequest.objects.filter(user=request.user, hero=hero, status=CallRequest.OPEN).exists():
            error = {'detail': 'User already has an open call request to this Hero.'}
            return Response(error, status=status.HTTP_409_CONFLICT)

        call_request = CallRequest.objects.create_call_request(
            user=request.user,
            hero=hero,
            message=data.validated_data['message'],
            estimated_length=data.validated_data['estimated_length'])

        serializer = self.serializer_class(call_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RetrieveCallRequestView(generics.RetrieveAPIView):
    serializer_class = CallRequestSerializer
    permission_classes = (IsOwnerOrStaff,) 
    queryset = CallRequest.objects.all()


class AcceptCallRequestHeroView(generics.UpdateAPIView):
    serializer_class = CallRequestSerializer
    permission_classes = (IsHeroOrStaff, IsOwnerOrStaff)

    def patch(self, request, *args, **kwargs):
        data = TimesSerializer(data=request.data)
        data.is_valid(raise_exception=True)
        call_request = get_object_or_404(CallRequest, id=kwargs['pk'])

        if call_request.status != CallRequest.OPEN:
            error = {'detail': 'Call request must have an open status to accept it.'}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        times = TimeSuggestion.objects.create(
            call_request=call_request,
            user=request.user,
            datetime_one=data.validated_data['time_one'],
            datetime_two=data.validated_data['time_two'],
            datetime_three=data.validated_data['time_three']
        )
        call_request.status = CallRequest.ACCEPTED
        call_request.save()

        # Alert user that the Hero responded to request
        call_request.user.send_accpeted_call_request_email(call_request, times)

        serializer = self.serializer_class(call_request)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeclineCallRequestHeroView(generics.UpdateAPIView):
    serializer_class = CallRequestSerializer
    permission_classes = (IsHeroOrStaff, IsOwnerOrStaff)

    def patch(self, request, *args, **kwargs):
        data = DeclineReasonSerializer(data=request.data)
        data.is_valid(raise_exception=True)
        call_request = get_object_or_404(CallRequest, id=kwargs['pk'])

        if call_request.status != CallRequest.OPEN:
            error = {'detail': 'Call request must have an open status to decline it.'}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        call_request.status = CallRequest.DECLINED
        call_request.reason = data.validated_data['reason']

        # Alert user that the Hero responded to request
        call_request.user.send_hero_declined_call_request_email(call_request)

        serializer = self.serializer_class(call_request)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NewTimeSuggestionsView(generics.UpdateAPIView):
    serializer_class = CallRequestSerializer
    permission_classes = (IsOwnerOrStaff,)

    def patch(self, request, *args, **kwargs):
        data = TimesSerializer(data=request.data)
        data.is_valid(raise_exception=True)
        call_request = get_object_or_404(CallRequest, id=kwargs['pk'])

        if call_request.status != CallRequest.ACCEPTED:
            error = {'detail': 'Call request must have an accepted status to suggest new times.'}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        times = TimeSuggestion.objects.create(
            call_request=call_request,
            user=request.user,
            datetime_one=data.validated_data['time_one'],
            datetime_two=data.validated_data['time_two'],
            datetime_three=data.validated_data['time_three']
        )

        if request.user.is_hero():
            # Alert user that the hero suggested new times
            call_request.user.send_new_suggested_times_email(call_request, times)
        else:
            # Alert hero that the user suggested new times
            call_request.hero.send_new_suggested_times_email(call_request, times)

        serializer = self.serializer_class(call_request)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AgreedTimeSuggestionView(generics.UpdateAPIView):
    serializer_class = CallRequestSerializer
    permission_classes = (IsOwnerOrStaff,)

    def patch(self, request, *args, **kwargs):
        data = AgreedTimeSerializer(data=request.data)
        data.is_valid(raise_exception=True)
        call_request = get_object_or_404(CallRequest, id=kwargs['pk'])
        agreed_time = data.validated_data['agreed_time']

        times = TimeSuggestion.objects.filter(call_request=call_request).latest('timestamp')

        if agreed_time not in [times.datetime_one, times.datetime_two, times.datetime_three]:
            error = {'detail': 'agreed_time is was not found in the most recent suggested times.'}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        if request.user == times.user:
            error = {'detail': 'User cannot accept his own time suggestions.'}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        if call_request.agreed_time is not None:
            error = {'detail': 'An agreed time has already been set for this call request.'}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        call_request.agreed_time = agreed_time

        # TODO schedule text messages to go out 15 min before the call with phone number

        if request.user.is_hero():
            # Alert user that the hero agreed to a suggested time
            call_request.user.send_agreed_time_email(call_request)
        else:
            # Alert hero that the user agreed to a suggested time
            call_request.hero.send_agreed_time_email(call_request)

        serializer = self.serializer_class(call_request)
        return Response(serializer.data, status=status.HTTP_200_OK)








