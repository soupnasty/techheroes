from rest_framework import serializers

from authentication.models import PhoneToken
from utils.validation import (valid_email, valid_phone, valid_password, valid_email_token,
    valid_phone_token, valid_password_token, LowerEmailField)

from .models import User


class CreatePhoneTokenSerializer(serializers.Serializer):
    phone = serializers.CharField(validators=[valid_phone])

    def validate_phone(self, value):
        # Check if this phone number exists with a verified user
        if User.objects.filter(phone=value, phone_verified=True).exists():
            raise serializers.ValidationError('Phone already in use, please use a different phone number.')

        # Check if there is already a nonexpired PhoneToken for this user
        if PhoneToken.objects.filter(phone=value).exists():
            phone_tokens = PhoneToken.objects.filter(phone=value)
            for pt in phone_tokens:
                if not pt.is_expired():
                    raise serializers.ValidationError('A phone token already exists for this phone. Check your messages.')

        return value


class RegisterUserSerializer(serializers.Serializer):
    email = LowerEmailField(validators=[valid_email])
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField(validators=[valid_password])
    phone = serializers.CharField(validators=[valid_phone])
    phone_token = serializers.CharField(min_length=6, max_length=6, validators=[valid_phone_token])
    timezone = serializers.CharField()

    def validate(self, data):
        # Check if user with this email already exists
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError('Email already in use, please use a different email address.')

        # Check if there is a PhoneToken instance
        if not PhoneToken.objects.filter(phone=data['phone'], token=data['phone_token']).exists():
            raise serializers.ValidationError('Phone token is not valid.')

        # Dont need phone_token anymore
        data.pop('phone_token')
        return data


class LoginUserSerializer(serializers.Serializer):
    email = LowerEmailField(validators=[valid_email])
    password = serializers.CharField(validators=[valid_password])

    def validate_email(self, value):
        """Check if user with this email already exists"""
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError('User with this email does not exist.')
        return value


class EmailTokenSerializer(serializers.Serializer):
    token = serializers.CharField(min_length=10, max_length=10, validators=[valid_email_token])


class PhoneTokenSerializer(serializers.Serializer):
    token = serializers.CharField(min_length=6, max_length=6, validators=[valid_phone_token])


class RequestPasswordResetSerializer(serializers.Serializer):
    email = LowerEmailField(validators=[valid_email])

    def validate_email(self, value):
        """Check if user with this email already exists"""
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError('User with this email does not exist.')
        return value


class PasswordResetSerializer(serializers.Serializer):
    token = serializers.CharField(min_length=8, max_length=8, validators=[valid_password_token])
    new_password = serializers.CharField(min_length=8, validators=[valid_password])


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(min_length=8, validators=[valid_password])
    new_password = serializers.CharField(min_length=8, validators=[valid_password])


class LimitedUserSerializer(serializers.ModelSerializer):
    timezone = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'profile_image', 'timezone', 'created')

    def get_timezone(self, obj):
        return str(obj.timezone)


class UserSerializer(serializers.ModelSerializer):
    timezone = serializers.SerializerMethodField()
    email_pending = serializers.SerializerMethodField()
    phone_pending = serializers.SerializerMethodField()
    phone = serializers.CharField(allow_null=True, validators=[valid_phone])
    email = LowerEmailField(validators=[valid_email])

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'email_verified', 'email_notifications',
                'phone', 'phone_verified', 'profile_image', 'is_active', 'email_pending',
                'phone_pending', 'timezone', 'created', 'updated')
        read_only_fields = ('id', 'email_verified', 'phone_verified', 'created', 'updated')

    def get_timezone(self, obj):
        return str(obj.timezone)

    def get_email_pending(self, obj):
        if hasattr(obj, 'email_token') and obj.email_token.id and not obj.email_token.is_expired:
            return obj.email_token.email
        else:
            return None

    def get_phone_pending(self, obj):
        if hasattr(obj, 'phone_token') and obj.phone_token.id and not obj.phone_token.is_expired:
            return obj.phone_token.phone
        else:
            return None

    def update(self, instance, validated_data):
        if 'email' in validated_data:
            email = validated_data.pop('email')
            instance.send_verification_email(email)

        if 'phone' in validated_data:
            phone = validated_data.pop('phone')
            instance.send_verification_phone(phone)

        return super().update(instance, validated_data)


class UserWithTokenSerializer(UserSerializer):
    token = serializers.SerializerMethodField('get_auth_token')

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'email_verified', 'email_notifications',
                'phone', 'phone_verified', 'profile_image', 'is_active', 'email_pending',
                'phone_pending', 'timezone', 'created', 'updated', 'token')
        read_only_fields = ('id', 'email_verified', 'phone_verified', 'created', 'updated', 'token')

    def get_auth_token(self, obj):
        return obj.auth_tokens.latest('timestamp').token


class GetTimeForUserSerializer(serializers.Serializer):
    user_id = serializers.UUIDField(format='hex_verbose')
    utc_datetime = serializers.DateTimeField()

    def validate_user_id(self, value):
        """Check if user with this id exists"""
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError('User with this id does not exist.')
        return value


class DateTimeSerializer(serializers.Serializer):
    user_local_datetime = serializers.DateTimeField()

