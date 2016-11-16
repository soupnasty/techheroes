import re

from disposable_email_checker.validators import validate_disposable_email
from django.core.exceptions import ValidationError
from django.core.validators import validate_email as django_validate_email

from rest_framework import serializers


# Validators
def valid_email(value):
    """Validate a single email."""
    if not value:
        return False
    # Check the regex, using the validate_email from django.
    try:
        django_validate_email(value)
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

def valid_password(value):
    long_enough = len(value) >= 8
    contains_digit = bool(re.search(r'[\d]', value))
    if long_enough and contains_digit:
        return
    raise serializers.ValidationError(
        'Passwords must be at least 8 characters and contain at least one digit.')


def valid_verification_token(value):
    if re.match(r'^[abcdefghjkmnopqrstuvwxyz0123456789]{20}$', value):
        return
    raise serializers.ValidationError('{} is not a valid verification token.'.format(value))


# Custom always-lowercase email field
class LowerEmailField(serializers.EmailField):

    def to_internal_value(self, data):
        value = super(LowerEmailField, self).to_internal_value(data)
        return value.lower()