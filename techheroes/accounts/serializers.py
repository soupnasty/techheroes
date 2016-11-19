from rest_framework import serializers

from utils.validation import (valid_email, valid_phone, valid_password, valid_email_token,
    valid_phone_token, valid_password_token, LowerEmailField)

from .models import User


class RegisterUserSerializer(serializers.Serializer):
    email = LowerEmailField(validators=[valid_email])
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField(validators=[valid_password])

    def validate_email(self, value):
        """Check if user with this email already exists"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already in use, please use a different email address.')
        return value


class LoginUserSerializer(serializers.Serializer):
    email = LowerEmailField(validators=[valid_email])
    password = serializers.CharField(validators=[valid_password])
    platform = serializers.CharField(required=False)

    def validate_platform(self, value):
        if not value.lower() in ['web', 'mobile']:
            raise serializers.ValidationError('Platform must be web or mobile.')
        return value.lower()

    def validate_email(self, value):
        """Check if user with this email already exists"""
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError('User with this email does not exist.')
        return value


class VerifyEmailTokenSerializer(serializers.Serializer):
    token = serializers.CharField(min_length=10, max_length=10, validators=[valid_email_token])


class VerifyPhoneTokenSerializer(serializers.Serializer):
    token = serializers.CharField(min_length=6, max_length=6, validators=[valid_phone_token])


class RequestPasswordResetSerializer(serializers.Serializer):
    login = serializers.CharField()

    def validate_login(self, value):
        return value.lower()


class PasswordResetSerializer(serializers.Serializer):
    token = serializers.CharField(min_length=8, max_length=8, validators=[valid_password_token])
    new_password = serializers.CharField(min_length=8, validators=[valid_password])


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(min_length=8, validators=[valid_password])
    new_password = serializers.CharField(min_length=8, validators=[valid_password])


class LimitedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'created')


class UserSerializer(serializers.ModelSerializer):
    email_pending = serializers.SerializerMethodField()
    phone_pending = serializers.SerializerMethodField()
    phone = serializers.CharField(allow_null=True, validators=[valid_phone])
    email = LowerEmailField(validators=[valid_email])

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'email_verified', 'email_notifications', 'phone',
                'phone_verified', 'profile_image', 'is_active', 'email_pending', 'phone_pending', 'created', 'updated')
        read_only_fields = ('id', 'email_verified', 'phone_verified', 'created', 'updated')

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
        fields = ('id', 'first_name', 'last_name', 'email', 'email_verified', 'email_notifications', 'phone',
            'phone_verified', 'profile_image', 'is_active', 'email_pending', 'phone_pending','created', 'updated', 'token')
        read_only_fields = ('id', 'email_verified', 'phone_verified', 'created', 'updated', 'token')

    def get_auth_token(self, obj):
        return obj.auth_tokens.latest('timestamp').token