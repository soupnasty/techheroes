from django.utils.timezone import now, timedelta
from rest_framework import serializers

from accounts.serializers import LimitedUserSerializer
from heroes.models import Hero
from utils.validation import valid_suggested_time

from .models import CallRequest, TimeSuggestion


class CreateCallRequestSerializer(serializers.Serializer):
    hero_id = serializers.IntegerField()
    message = serializers.CharField(max_length=500)
    estimated_length = serializers.IntegerField(max_value=120)

    def validate_hero_id(self, value):
        if not Hero.objects.filter(id=value).exists():
            raise serializers.ValidationError('Hero with provided hero_id does not exist')
        return value

    def validate_estimated_length(self, value):
        if value % 15 != 0:
            raise serializers.ValidationError('Field estimated_length must be an interval of 15')
        return value


class TimeSuggestionSerializer(serializers.ModelSerializer):
    user = LimitedUserSerializer(many=False)

    class Meta:
        model = TimeSuggestion
        fields = ('user', 'datetime_one', 'datetime_two', 'datetime_three', 'timestamp')


class CallRequestSerializer(serializers.ModelSerializer):
    times = TimeSuggestionSerializer(many=True)

    class Meta:
        model = CallRequest
        fields = ('id', 'user', 'hero', 'message', 'estimated_length', 'status', 'reason',
                    'times', 'agreed_time', 'created', 'updated')
        read_only_fields = ('id', 'user', 'hero', 'created', 'updated')


class TimesSerializer(serializers.Serializer):
    time_one = serializers.DateTimeField(validators=[valid_suggested_time])
    time_two = serializers.DateTimeField(validators=[valid_suggested_time])
    time_three = serializers.DateTimeField(validators=[valid_suggested_time])


class DeclineReasonSerializer(serializers.Serializer):
    reason = serializers.CharField(max_length=500)


class AgreedTimeSerializer(serializers.Serializer):
    agreed_time = serializers.DateTimeField()


class CancelCallSerializer(serializers.Serializer):
    reason = serializers.CharField(max_length=500)
    force = serializers.BooleanField(default=True)


