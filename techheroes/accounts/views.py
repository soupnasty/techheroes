import uuid

from rest_framework import status
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from accounts.serializers import (RegisterUserSerializer, LoginUserSerializer, UserSerializer,
        UserWithTokenSerializer)
from authentication.models import AuthToken
from utils.mixins import AtomicMixin


class RegisterUserView(AtomicMixin, GenericAPIView):
    """
    POST: Register a new user, creating a user and auth token.
    """
    serializer_class = RegisterUserSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        data = self.serializer_class(data=request.data)
        data.is_valid(raise_exception=True)

        new_user = User.objects.create_user(**data.validated_data)
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

        try:
            user = User.objects.get(email=data.validated_data['email'])
        except User.DoesNotExist:
            error = {'detail': 'User with this email does not exist.'}
            return Response(error, status=status.HTTP_404_NOT_FOUND)

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


class RetrieveUpdateUserView(RetrieveUpdateAPIView):
    model = User
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user