from django.utils.timezone import now, timedelta
from rest_framework import serializers

from call_requests.models import CallRequest
from .models import Conference, ConferenceLog


class ConferenceLogSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = ConferenceLog
        fields = ('user', 'action', 'timestamp')

    def get_user(self, obj):
        if obj.user:
            return obj.user.get_full_name()
        return str(obj)


class CallRequestSummarySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    hero = serializers.SerializerMethodField()

    class Meta:
        model = CallRequest
        fields = ('id', 'user', 'hero', 'message', 'estimated_length', 'agreed_time')

    def get_user(self, obj):
        return obj.user.get_full_name()

    def get_hero(self, obj):
        return obj.hero.user.get_full_name()


class ConferenceListSerializer(serializers.ModelSerializer):
    call_request = CallRequestSummarySerializer(many=False)

    class Meta:
        model = Conference
        fields = ('sid', 'friendly_name', 'call_request', 'created')


class ConferenceDetailSerializer(ConferenceListSerializer):
    logs = ConferenceLogSerializer(many=True)

    class Meta:
        model = Conference
        fields = ('sid', 'friendly_name', 'call_request', 'logs', 'created')



