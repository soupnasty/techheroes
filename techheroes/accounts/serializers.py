from rest_framework import serializers

from utils.validation import valid_email, valid_password, valid_verification_token, LowerEmailField

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
    email = LowerEmailField()
    password = serializers.CharField(validators=[valid_password])


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'created')


class UserWithTokenSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField('get_auth_token')

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'email_verified', 'email_notifications',
                    'phone', 'phone_verified', 'profile_image', 'is_active', 'created', 'updated', 'token')
        read_only_fields = ('id', 'email_verified', 'phone_verified', 'created', 'updated', 'token')

    def get_auth_token(self, obj):
        return obj.auth_tokens.latest('timestamp').token