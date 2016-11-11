import re

from rest_framework import serializers

from accounts.models import User
from utils.validation import validate_email as email_is_valid


# Validators
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


class RegisterUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField(validators=[valid_password])

    def validate_email(self, value):
        """
        Validate if email is valid or there is an user using the email.
        """
        if not email_is_valid(value):
            raise serializers.ValidationError('Please use a different email address provider.')

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already in use, please use a different email address.')

        return value


class LoginUserSerializer(serializers.Serializer):
    email = LowerEmailField()
    password = serializers.CharField(validators=[valid_password])


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'email_verified',
                    'is_active', 'recieve_notifications', 'created', 'updated')
        read_only_fields = ('id', 'email_verified', 'created', 'updated')


class UserWithTokenSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField('get_auth_token')

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'email_verified',
                    'is_active', 'recieve_notifications', 'created', 'updated', 'token')
        read_only_fields = ('id', 'email_verified', 'created', 'updated', 'token')

    def get_auth_token(self, obj):
        return obj.auth_tokens.latest('timestamp').token