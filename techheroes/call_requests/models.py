from datetime import timedelta

from django_q.tasks import async, schedule
from django_q.models import Schedule
from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone

from accounts.models import User
from heroes.models import Hero


class CallRequestManager(models.Manager):
    def create_call_request(self, user, hero, message, estimated_length):
        call_request = self.create(
            user=user,
            hero=hero,
            message=message,
            estimated_length=estimated_length)

        # Alert hero through email that he recieved a call request
        hero.send_new_call_request_email(call_request)
        return call_request


class CallRequest(models.Model):
    OPEN = 'o'
    ACCEPTED = 'a'
    DECLINED = 'd'
    CANCELED = 'c'
    SUCCESSFUL = 's'

    STATUSES = (
        (OPEN, 'Open'),
        (ACCEPTED, 'Accepted'),
        (DECLINED, 'Declined'),
        (CANCELED, 'Canceled'),
        (SUCCESSFUL, 'Successful'),
    )

    user = models.ForeignKey(User, related_name='call_requests')
    hero = models.ForeignKey(Hero, related_name='call_requests')
    message = models.TextField(max_length=500)
    estimated_length = models.IntegerField()
    status = models.CharField(max_length=1, choices=STATUSES, default=OPEN)
    reason = models.TextField(max_length=500, default='')
    agreed_time = models.DateTimeField(null=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = CallRequestManager()

    class Meta:
        verbose_name = 'Call Request'
        verbose_name_plural = 'Call Requests'

    def __str__(self):
        return 'User: {0} Hero: {1} Accepted Time: {2}'.format(
            self.user.get_full_name(), self.hero.user.get_full_name(), self.agreed_time)

    def schedule_sms_reminders(self):
        """ Schedule reminders for both the hero and user """
        for user in [self.user, self.hero.user]:
            other_user = self.hero.user if user == self.user else self.user
            message = ('This is a reminder from Tech Heroes! You have a call with {}. '
                        'Dial this number {} in {} minutes.'.format(
                        other_user.get_full_name(), settings.CONFERENCE_NUMBER, settings.SMS_REMINDER_TIME_IN_MIN))
            next_run = self.agreed_time - timezone.timedelta(minutes=settings.SMS_REMINDER_TIME_IN_MIN)

            schedule(
                'utils.call_request_sms_reminder',
                self.id,
                str(user.id),
                message,
                schedule_type=Schedule.ONCE,
                next_run=next_run
            )


class TimeSuggestion(models.Model):
    call_request = models.ForeignKey(CallRequest, related_name='times', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='times', on_delete=models.CASCADE)
    datetime_one = models.DateTimeField()
    datetime_two = models.DateTimeField()
    datetime_three = models.DateTimeField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Time Suggestion'
        verbose_name_plural = 'Time Suggestions'


class CanceledCallRequestLog(models.Model):
    user = models.ForeignKey(User, related_name='canceled_call_requests')
    call_request = models.OneToOneField(CallRequest)
    reason = models.TextField(max_length=500, default='')
    was_accepted = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Canceled Call Request Log'
        verbose_name_plural = 'Canceled Call Request Logs'

