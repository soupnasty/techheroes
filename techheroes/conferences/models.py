from datetime import timedelta

from django_q.tasks import schedule
from django_q.models import Schedule
from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone

from accounts.models import User
from heroes.models import Hero
from call_requests.models import CallRequest


class Conference(models.Model):
    twilio_sid = models.CharField(max_length=34)
    call_request = models.OneToOneField(CallRequest)
    friendly_name = models.CharField(max_length=50)
    time_in_seconds = models.IntegerField()

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Conference room: {0}'.format(friendly_name)


class ConferenceAction(models.Model):
    OTHER = 'o'
    JOINED = 'j'
    LEFT = 'l'

    ACTIONS = (
        (OTHER, 'o'),
        (JOINED, 'j'),
        (LEFT, 'l')
    )

    conference = models.ForeignKey(Conference, related_name='conference_actions', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='conference_actions')
    action = models.CharField(max_length=1, choices=ACTIONS, default=OTHER)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Conference Action'
        verbose_name_plural = 'Conference Actions'

    def __str__(self):
        return 'User: {0} Action: {1} Timestamp: {2}'.format(
            self.user.get_full_name(), self.action, self.timestamp)

