import re

from disposable_email_checker.validators import validate_disposable_email
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.timezone import now, timedelta

from rest_framework import serializers


# Validators
def is_email(value):
    try:
        validate_email(value)
        return True
    except ValidationError:
        return False


def valid_email(value):
    """Validate a single email."""
    if not value:
        return False
    # Check the regex, using the validate_email from django.
    try:
        validate_email(value)
    except ValidationError:
        raise serializers.ValidationError(
            'Email is not a valid email.')
    else:
        # Check with the disposable list.
        try:
            validate_disposable_email(value)
        except ValidationError:
            raise serializers.ValidationError(
                'Please use a different email address provider.')
        else:
            return


def is_phone(value):
    return re.match(r'^\d{10}$', value)


def valid_phone(value):
    if is_phone(value):
        return
    raise serializers.ValidationError('Phone numbers must be 10 digits.')


def valid_suggested_time(value):
    if value > now() + timedelta(minutes=30):
        return
    raise serializers.ValidationError('Times must be atleast 30 min in the future')


def valid_password(value):
    long_enough = len(value) >= 8
    contains_digit = bool(re.search(r'[\d]', value))
    if long_enough and contains_digit:
        return
    raise serializers.ValidationError(
        'Passwords must be at least 8 characters and contain at least one digit.')


def valid_email_token(value):
    if re.match(r'^[abcdefghjkmnopqrstuvwxyz0123456789]{10}$', value):
        return
    raise serializers.ValidationError('{} is not a valid email verification token.'.format(value))


def valid_phone_token(value):
    if re.match(r'^[abcdefghjkmnopqrstuvwxyz0123456789]{6}$', value):
        return
    raise serializers.ValidationError('{} is not a valid phone verification token.'.format(value))


def valid_password_token(value):
    if re.match(r'^[abcdefghjkmnopqrstuvwxyz0123456789]{8}$', value):
        return
    raise serializers.ValidationError('{} is not a valid password verification token.'.format(value))


# Custom always-lowercase email field
class LowerEmailField(serializers.EmailField):

    def to_internal_value(self, data):
        value = super(LowerEmailField, self).to_internal_value(data)
        return value.lower()