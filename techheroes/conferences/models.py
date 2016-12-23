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
    sid = models.CharField(max_length=34, primary_key=True, editable=False)
    friendly_name = models.CharField(max_length=50)
    call_request = models.OneToOneField(CallRequest, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'Conference room: {0}'.format(self.friendly_name)


class ConferenceLog(models.Model):
    PARTICIPANT_JOIN = 'participant-join'
    PARTICIPANT_LEAVE = 'participant-leave'
    CONFERENCE_START = 'conference-start'
    CONFERENCE_END = 'conference-end'

    ACTIONS = (
        (PARTICIPANT_JOIN, 'Participant Joined'),
        (PARTICIPANT_LEAVE, 'Participant Left'),
        (CONFERENCE_START, 'Conference Started'),
        (CONFERENCE_END, 'Conference Ended')
    )

    conference = models.ForeignKey(Conference, related_name='logs', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='conference_logs', on_delete=models.CASCADE, null=True)
    action = models.CharField(max_length=20, choices=ACTIONS)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Conference Log'
        verbose_name_plural = 'Conference Logs'

    def __str__(self):
        if self.user:
            return '{0}: {1}'.format(self.user.get_full_name(), self.action)
        return 'Conference Log'


class Call(models.Model):
    sid = models.CharField(max_length=34, primary_key=True, editable=False)
    user = models.ForeignKey(User, related_name='calls', on_delete=models.CASCADE)
    call_request = models.ForeignKey(CallRequest, related_name='calls', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{0}: {1}'.format(self.user.get_full_name(), self.timestamp)
