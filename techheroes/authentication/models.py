from datetime import timedelta
from uuid import uuid4

from django.conf import settings
from django.db import models
from django.utils import timezone

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed


def generate_token():
    return uuid4().hex


class AuthToken(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='auth_tokens', on_delete=models.CASCADE)
    token = models.CharField(max_length=36, default=generate_token)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'AuthToken'
        verbose_name_plural = 'AuthTokens'

    def __str__(self):
        return self.user.email

    @property
    def is_expired(self):
        delta = timedelta(days=settings.AUTH_TOKEN_EXP_IN_DAYS) if self.user.email_verified else timedelta(hours=24)
        if timezone.now() - self.timestamp < delta:
            return False
        self.delete()
        return True


class TokenAuthentication(BaseAuthentication):

    def authenticate(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')

        if not token:
            return None

        return self.authenticate_credentials(token)

    def authenticate_credentials(self, key):
        try:
            token = AuthToken.objects.select_related('user').get(token=key)
        except AuthToken.DoesNotExist:
            raise AuthenticationFailed()

        if token.is_expired:
            raise AuthenticationFailed()

        return (token.user, token.token)


class InvalidTokenError(Exception):
    pass


class VerificationToken(models.Model):
    """
    This is an abstract model used to verify email and password tokens.
    """
    TOKEN_LENGTH = 10

    token = models.CharField(max_length=TOKEN_LENGTH, unique=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.user.email

    @property
    def is_expired(self):
        if timezone.now() - self.timestamp < timedelta(days=settings.VERIFICATION_TOKEN_EXP_IN_DAYS):
            return False
        self.delete()
        return True

    def generate_token(self):
        return uuid4().hex[:self.TOKEN_LENGTH]

    def save(self, *args, **kwargs):
        if not self.pk:
            token = self.generate_token()
            while self.__class__.objects.filter(token=token).exists():
                token = self.generate_token()
            self.token = token
        super(VerificationToken, self).save(*args, **kwargs)


class EmailToken(VerificationToken):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='email_token', on_delete=models.CASCADE)
    email = models.EmailField(max_length=100)

    class Meta:
        verbose_name = u'Email Verification Token'
        verbose_name_plural = u'Email Verification Tokens'


class PhoneToken(VerificationToken):
    TOKEN_LENGTH = 6

    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='phone_token', on_delete=models.CASCADE, null=True)
    phone = models.CharField(max_length=10)

    class Meta:
        verbose_name = u'Phone VerificationToken'
        verbose_name_plural = u'Phone Verification Tokens'


class PasswordToken(VerificationToken):
    TOKEN_LENGTH = 8

    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='password_token', on_delete=models.CASCADE)

    class Meta:
        verbose_name = u'Password Verification Token'
        verbose_name_plural = u'Password Verification Tokens'
