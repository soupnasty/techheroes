import pytz
import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from twilio.rest import TwilioRestClient
from timezone_field import TimeZoneField

from authentication.models import AuthToken, EmailToken, PhoneToken, PasswordToken, InvalidTokenError
from utils.functions import convert_utc_to_local_time

from .emails import get_email


class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        user.send_registration_email(user.email)
        AuthToken.objects.create(user=user)
        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', False)

        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    email_verified = models.BooleanField(default=False)
    email_notifications = models.BooleanField(default=True)
    phone = models.CharField(max_length=10, unique=True, null=True)
    phone_verified = models.BooleanField(default=False)
    profile_image = models.URLField(blank=True, null=True)
    timezone = TimeZoneField(default='America/Chicago')

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_short_name(self):
        return self.first_name

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

    def request_password_reset(self, email):
        if hasattr(self, 'password_token') and self.password_token.id is not None:
            self.password_token.delete()

        password_token = PasswordToken.objects.create(user=self)
        # TODO change this when email is ready
        link = 'https://{0}/reset-password/{1}'.format(settings.WEB_DOMAIN, password_token.token)

        subject = 'Tech Heroes: Password reset request'
        message = (
            'A request has been made to reset the password for your Tech Heroes account.\n '
            'Click the following link to change your password: {0}'.format(link))
        self.send_email(subject, message)

    def send_new_hero_alert(self, hero):
        """This route is for staff users only, alert staff upon new hero application"""
        if not self.is_staff:
            return

        # TODO change this when email is ready
        link = 'https://{0}/accept-decline-hero/{1}'.format(settings.WEB_DOMAIN, hero.id)
        context = {'hero_name': hero.user.get_full_name(), 'link': link, 'type': 'new_hero_application'}

        subject, text, html = get_email(context)
        self.send_email(subject, text, html=html, email=self.email)

    def send_accpeted_call_request_email(self, call_request, times):
        # TODO change this when email is ready
        link = 'https://{0}/call-request/{1}'.format(settings.WEB_DOMAIN, call_request.id)
        context = {
            'user_name': self.get_short_name(),
            'hero_name': call_request.hero.user.get_full_name(),
            'link': link,
            'message': call_request.message,
            'estimated_length': call_request.estimated_length,
            'datetime_one': convert_utc_to_local_time(times.datetime_one, self.timezone),
            'datetime_two': convert_utc_to_local_time(times.datetime_two, self.timezone),
            'datetime_three': convert_utc_to_local_time(times.datetime_three, self.timezone),
            'type': 'hero_accepted_call_request'}

        subject, text, html = get_email(context)
        self.send_email(subject, text, html=html, email=self.email)

    def send_hero_declined_call_request_email(self, call_request):
        # TODO change this when email is ready
        link = 'https://{0}/#heros'.format(settings.WEB_DOMAIN)
        context = {
            'user_name': self.get_full_name(),
            'hero_name': call_request.hero.user.get_full_name(),
            'link': link,
            'message': call_request.message,
            'estimated_length': call_request.estimated_length,
            'reason': call_request.reason,
            'type': 'hero_declined_call_request'}

        subject, text, html = get_email(context)
        self.send_email(subject, text, html=html, email=self.email)

    def send_new_suggested_times_email(self, call_request, times):
        # TODO change this when email is ready
        link = 'https://{0}/call-request/{1}'.format(settings.WEB_DOMAIN, call_request.id)
        context = {
            'user_name': self.get_full_name(),
            'hero_name': call_request.hero.user.get_full_name(),
            'link': link,
            'message': call_request.message,
            'estimated_length': call_request.estimated_length,
            'datetime_one': convert_utc_to_local_time(times.datetime_one, self.timezone),
            'datetime_two': convert_utc_to_local_time(times.datetime_two, self.timezone),
            'datetime_three': convert_utc_to_local_time(times.datetime_three, self.timezone),
            'type': 'hero_suggested_new_times'}

        subject, text, html = get_email(context)
        self.send_email(subject, text, html=html, email=self.email)

    def send_agreed_time_email(self, call_request):
        context = {
            'user_name': self.get_short_name(),
            'hero_name': call_request.hero.user.get_full_name(),
            'message': call_request.message,
            'estimated_length': call_request.estimated_length,
            'agreed_time': convert_utc_to_local_time(call_request.agreed_time, self.timezone),
            'type': 'hero_agreed_to_time'}

        subject, text, html = get_email(context)
        self.send_email(subject, text, html=html, email=self.email)

    def send_cancelation_confirmation_email(self, other_user):
        context = {
            'user_name': self.get_full_name(),
            'other_user_name': other_user.get_full_name(),
            'type': 'call_request_cancelation_confirmation'}

        subject, text, html = get_email(context)
        self.send_email(subject, text, html=html, email=self.email)

    def alert_user_of_cancelation_email(self, other_user, reason):
        context = {
            'user_name': self.get_full_name(),
            'other_user_name': other_user.get_full_name(),
            'reason': reason,
            'type': 'alert_user_of_cancelation'}

        subject, text, html = get_email(context)
        self.send_email(subject, text, html=html, email=self.email)




