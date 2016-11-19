import uuid
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from twilio.rest import TwilioRestClient

from authentication.models import AuthToken, EmailToken, PhoneToken, PasswordToken, InvalidTokenError

from .emails import get_email


class UserManager(BaseUserManager):
    def _create_user(self, email, password, first_name, last_name, is_staff, **extra_fields):
        """
        Create and save an User with the given email, password and name.
        """
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name,
                            is_staff=is_staff, is_active=True, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        user.send_registration_email(user.email)

        AuthToken.objects.create(user=user)
        return user

    def create_user(self, email, first_name, last_name, password, **extra_fields):
        """
        Create and save an User with the given email, password and name.
        """
        return self._create_user(email, password, first_name, last_name, is_staff=False, **extra_fields)

    def create_staff(self, email, first_name='', last_name='', password=None, **extra_fields):
        """
        Create a super user.
        """
        return self._create_user(email, password, first_name, last_name, is_staff=True, **extra_fields)


class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    email_verified = models.BooleanField(default=False)
    email_notifications = models.BooleanField(default=True)
    phone = models.CharField(max_length=10, unique=True, null=True)
    phone_verified = models.BooleanField(default=False)
    profile_image = models.URLField(blank=True, null=True)
    has_app = models.BooleanField(default=False)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return "{0} {1}".format(self.first_name, self.last_name)

    def is_hero(self):
        try:
            return self.hero is not None
        except ObjectDoesNotExist:
            return False

    def login(self):
        for token in self.auth_tokens.all():
            token.is_expired

        AuthToken.objects.create(user=self)
        self.last_login = timezone.now()
        self.save()

    def send_email(self, subject, text, html=None, email=None):
        recipient_list = [email] if email else [self.email]

        try:
            send_mail(
                subject, text, settings.SERVER_EMAIL, recipient_list,
                fail_silently=False, html_message=html)
        except Exception as e:
            # TODO Log this
            print('Couldn\'t send a email to {0} because: {1}'.format(self.get_full_name(), str(e)))

    def send_registration_email(self, email):
        """Send's an email to the user to verify their account upon initial sign up"""
        email_token = EmailToken.objects.create(user=self, email=email)

        # TODO change this when email is ready
        link = 'https:://{0}/verify-email/{1}'.format(settings.WEB_DOMAIN, email_token.token)
        context = {'user_first_name': self.first_name, 'link': link, 'type': 'new_user_registered'}

        subject, text, html = get_email(context)
        self.send_email(subject, text, html=html, email=email)

    def send_verification_email(self, email):
        """Send's an email to verify the user's new email"""
        if hasattr(self, 'email_token') and self.email_token.id is not None:
            self.email_token.delete()

        if self.email == email and self.email_verified:
            return

        email_token = EmailToken.objects.create(user=self, email=email)
        # TODO change this when email is ready
        link = 'https:://{0}/verify-email/{1}'.format(settings.WEB_DOMAIN, email_token.token)
        context = {'user_first_name': self.first_name, 'link': link, 'type': 'verify_email'}

        subject, text, html = get_email(context)
        self.send_email(subject, text, html=html, email=email)

    def verify_email(self, token):
        try:
            email_token = EmailToken.objects.get(user_id=self.id)
        except EmailToken.DoesNotExist:
            raise InvalidTokenError('The supplied email verification token in invalid.')

        if email_token.is_expired:
            raise InvalidTokenError('The supplied email verification token has expired.')

        if email_token.token == token:
            self.email_verified = True
            self.email = email_token.email
            email_token.delete()
            self.save()
        else:
            raise InvalidTokenError('The supplied email verification token was invalid.')

    def send_sms(self, msg, phone=None):
        phone = phone if phone else self.phone
        if not phone:
            return

        phone = '+1' + phone

        try:
            client = TwilioRestClient(settings.TWILIO_ACCOUNT_ID, settings.TWILIO_API_TOKEN)
            client.messages.create(body=msg, to=phone, from_=settings.TWILIO_NUMBER)
        except Exception as e:
            # TODO Log this
            print('Couldn\'t send a text to {0} because: {1}'.format(self.get_full_name(), str(e)))

    def send_verification_phone(self, phone):
        if hasattr(self, 'phone_token') and self.phone_token.id is not None:
            self.phone_token.delete()

        if self.phone == phone and self.phone_verified:
            return

        phone_token = PhoneToken.objects.create(user=self, phone=phone)

        message = ('You recently added this phone number to your Tech Heroes account. '
                    'Verify your phone number with this token: {0}'.format(phone_token.token))
        self.send_sms(message, phone)

    def verify_phone(self, token):
        try:
            phone_token = PhoneToken.objects.get(user_id=self.id)
        except PhoneToken.DoesNotExist:
            raise InvalidTokenError('The supplied phone verification token in invalid.')

        if phone_token.is_expired:
            raise InvalidTokenError('The supplied phone verification token has expired.')

        if phone_token.token == token:
            self.phone_verified = True
            self.phone = phone_token.phone
            phone_token.delete()
            self.save()
        else:
            raise InvalidTokenError('The supplied phone verification token was invalid.')

    def request_password_reset(self, email=None, phone=None):
        if not email and not phone:
            raise ValueError('Must supply either a valid email address or phone number.')

        if hasattr(self, 'password_token') and self.password_token.id is not None:
            self.password_token.delete()

        password_token = PasswordToken.objects.create(user=self)
        # TODO change this when email is ready
        url = 'https://{0}/reset-password/{1}'.format(settings.WEB_DOMAIN, password_token.token)

        if email:
            subject = 'Tech Heroes: Password reset request'
            message = (
                'A request has been made to reset the password for your Tech Heroes account.\n '
                'Click the following link to change your password: {0}'.format(url))
            self.send_email(subject, message)

        else:
            message = (
                'A request has been made to reset the password for your Tech Heroes account. '
                'You can enter the following token in the Tech Heroes app to change your password.\n'
                'Token: {0}'.format(password_token.token))
            self.send_sms(message)
