import uuid
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone

from authentication.models import AuthToken


class UserManager(BaseUserManager):
    def _create_user(self, email, password, first_name, last_name, is_staff, is_superuser, **extra_fields):
        """
        Create and save an User with the given email, password and name.
        """
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, is_staff=is_staff,
                          is_active=True, is_superuser=is_superuser, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        AuthToken.objects.create(user=user)
        return user

    def create_user(self, email, first_name, last_name, password, **extra_fields):
        """
        Create and save an User with the given email, password and name.
        """
        return self._create_user(email, password, first_name, last_name, is_staff=False,
                                is_superuser=False, **extra_fields)

    def create_superuser(self, email, first_name='', last_name='', password=None, **extra_fields):
        """
        Create a super user.
        """
        return self._create_user(email, password, first_name, last_name, is_staff=True,
                                is_superuser=True, **extra_fields)


class User(AbstractBaseUser):
    """
    Model that represents an user.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    email_verified = models.BooleanField(default=False)
    recieve_notifications = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return "{0} {1}".format(self.first_name, self.last_name)

    def login(self):
        for token in self.auth_tokens.all():
            token.is_expired

        AuthToken.objects.create(user=self)
        self.last_login = timezone.now()
        self.save()