import uuid
from datetime import timedelta

from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone

from accounts.models import User


class Hero(models.Model):
    FRONT_END = 'FE'
    BACK_END = 'BE'
    IOS = 'IO'
    ANDROID = 'AN'
    DESIGN = 'UX'

    DISCIPLINES = (
        (FRONT_END, 'Front End'),
        (BACK_END, 'Back End'),
        (IOS, 'iOS'),
        (ANDROID, 'Android'),
        (DESIGN, 'UX Design'),
    )

    user = models.OneToOneField(User)
    discipline = models.CharField(max_length=2, choices=DISCIPLINES, default=None, null=True)
    short_bio = models.CharField(max_length=200, default='')
    resume = models.TextField(default='')
    years_of_exp = models.IntegerField(default=0)
    rate_in_cents = models.IntegerField(default=0)
    accepted = models.BooleanField(default=False)
    linkedin_url = models.URLField()
    skills = JSONField()

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email

    def get_full_name(self):
        return "{0} {1}".format(self.user.first_name, self.user.last_name)

