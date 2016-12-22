import uuid

from django.core.exceptions import ValidationError
from django.db import IntegrityError
from rest_framework import status
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from accounts.serializers import (RegisterUserSerializer, LoginUserSerializer, UserSerializer,
        UserWithTokenSerializer, EmailTokenSerializer, CreatePhoneTokenSerializer, PhoneTokenSerializer,
        PasswordChangeSerializer, PasswordResetSerializer, RequestPasswordResetSerializer,
        GetTimeForUserSerializer, DateTimeSerializer)
from authentication.models import AuthToken, PasswordToken, PhoneToken, InvalidTokenError
from utils.functions import send_sms
from utils.mixins import AtomicMixin
from utils.validation import is_email, is_phone


class CreatePhoneTokenView(GenericAPIView):
    """
    POST: Create a phone_token for a particular phone number.
    """
    serializer_class = CreatePhoneTokenSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        phone = data.validated_data['phone']
        phone_token = PhoneToken.objects.create(phone=phone)
        msg = 'Hello from Tech Heroes! Verify your phone with this token: {0}'.format(phone_token.token)

        try:
            send_sms(phone, msg)
        except SendSMSError as e:
            error = {'detail': str(e)}
            return Response(error, status=status.HTTP_424_FAILED_DEPENDENCY)

        return Response({}, status=status.HTTP_201_CREATED)


class RegisterUserView(AtomicMixin, GenericAPIView):
    """
    POST: Register a new user, creating a user and auth token.
    """
    serializer_class = RegisterUserSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        try:
            data.validated_data['phone_verified'] = True
            new_user = User.objects.create_user(**data.validated_data)
        except ValidationError:
            error = {'detail': 'Invalid timezone'}
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserWithTokenSerializer(new_user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginUserView(GenericAPIView):
    """
    POST: Validates email and password, creates a new auth token.
    """
    serializer_class = LoginUserSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        """User login with username and password."""
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        user = User.objects.get(email=data.validated_data['email'])
        if not user.check_password(data.validated_data['password']):
            error = {'detail': 'Password is incorrect.'}
            return Response(error, status=status.HTTP_403_FORBIDDEN)

        user.login()
        serializer = UserWithTokenSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutUserView(GenericAPIView):
    """
    DELETE: Logs out a user and deletes their auth token.
    """
    serializer_class = LoginUserSerializer

    def delete(self, request):
        token = AuthToken.objects.get(token=request.auth)
        token.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class VerifyEmailUserView(GenericAPIView):
    """
    POST: If the provided email token is valid, verifies a user's email.
    """
    serializer_class = EmailTokenSerializer

    def post(self, request):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        try:
            request.user.verify_email(data.validated_data['token'])
        except InvalidTokenError as e:
            return Response({'detail': str(e)}, status=status.HTTP_404_NOT_FOUND)
        except IntegrityError:
            return Response(
                {'detail': 'That email address is already verified by another user.'},
                status=status.HTTP_409_CONFLICT)

        result = UserSerializer(request.user)
        return Response(result.data, status=status.HTTP_200_OK)


class VerifyPhoneUserView(GenericAPIView):
    """
    POST: If the provided phone token is valid, verifies a user's phone number.
    """
    serializer_class = PhoneTokenSerializer

    def post(self, request):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        try:
            request.user.verify_phone(data.validated_data['token'])
        except InvalidTokenError as e:
            return Response({'detail': str(e)}, status=status.HTTP_404_NOT_FOUND)
        except IntegrityError:
            return Response(
                {'detail': 'That phone number is already verified by another user.'},
                status=status.HTTP_409_CONFLICT)

        result = UserSerializer(request.user)
        return Response(result.data, status=status.HTTP_200_OK)


class ChangePasswordUserView(GenericAPIView):
    """
    POST: Change a user's existing password.
    """
    serializer_class = PasswordChangeSerializer

    def post(self, request):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        if not request.user.check_password(data.validated_data['old_password']):
            return Response(
                {'old_password': 'Incorrect user password.'},
                status=status.HTTP_400_BAD_REQUEST)

        request.user.set_password(data.validated_data['new_password'])
        request.user.save()

        return Response(status=status.HTTP_201_CREATED)


class RequestPasswordUserView(GenericAPIView):
    """
    POST: Generates a token for given email or phone, and
    sends the token to the user via email or SMS as appropriate.
    """
    serializer_class = RequestPasswordResetSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        user = User.objects.get(email=data.validated_data['email'])
        user.request_password_reset(user.email)
        result = {'detail': 'A reset token has been sent to your email address.'}
        return Response(result, status=status.HTTP_200_OK)


class ResetPasswordUserView(GenericAPIView):
    """
    POST: If the provided token is valid, resets a user's password and logs them in.
    """
    serializer_class = PasswordResetSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        try:
            password_token = PasswordToken.objects.select_related(
                'user').get(token=data.validated_data['token'])
        except PasswordToken.DoesNotExist:
            return Response(
                {'detail': 'Invalid reset token for this user.'},
                status=status.HTTP_404_NOT_FOUND)

        if password_token.is_expired:
            return Response(
                {'detail': 'The given reset token has expired.'},
                status=status.HTTP_404_NOT_FOUND)

        user = password_token.user
        user.set_password(data.validated_data['new_password'])
        user.save()
        user.login()
        password_token.delete()

        result = UserWithTokenSerializer(user)
        return Response(result.data, status=status.HTTP_200_OK)


class RetrieveUpdateUserView(RetrieveUpdateAPIView):
    model = User
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class GetTimeForUserView(GenericAPIView):
    serializer_class = GetTimeForUserSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        user = User.objects.get(id=data.validated_data['user_id'])
        utc_datetime = data.validated_data['utc_datetime']
        local_datetime = utc_datetime.astimezone(user.timezone)

        serializer = DateTimeSerializer({"user_local_datetime": local_datetime})
        return Response(serializer.data, status=status.HTTP_200_OK)

