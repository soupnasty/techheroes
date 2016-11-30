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
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=1000, default='')
    short_bio = models.TextField(max_length=2000, default='')
    years_of_exp = models.IntegerField(default=0)
    rate_in_cents = models.IntegerField(default=0)
    accepted = models.BooleanField(default=False)
    linkedin_url = models.URLField()

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email

    def get_full_name(self):
        return "{0} {1}".format(self.user.first_name, self.user.last_name)


class HeroAcceptAction(models.Model):
    user = models.ForeignKey(User, related_name='hero_accept_actions')
    hero = models.ForeignKey(Hero, related_name='hero_accpet_actions')
    accepted = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.accepted:
            return self.user.get_full_name() + ' accepted ' + self.hero.user.get_full_name() + ' on ' + self.timestamp
        else:
            return self.user.get_full_name() + ' declined ' + self.hero.user.get_full_name() + ' on ' + self.timestamp

