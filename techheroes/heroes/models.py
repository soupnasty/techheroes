import uuid
from datetime import timedelta

from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils import timezone
from django.utils.text import slugify

from accounts.models import User

from .emails import get_email


class HeroManager(models.Manager):
    def create_hero(self, user, data):
        hero = self.create(user=user, **data)
        # Alert staff through email upon Hero creation
        staff = User.objects.filter(is_staff=True)
        for user in staff:
            user.send_new_hero_alert(hero)

        return hero


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
    slug = models.SlugField(max_length=50, unique=True)
    discipline = models.CharField(max_length=2, choices=DISCIPLINES, default=None, null=True)
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=1000, default='')
    position = models.CharField(max_length=25, default='')
    company = models.CharField(max_length=25, default='')
    short_bio = models.TextField(max_length=2000, default='')
    years_of_exp = models.IntegerField(default=0)
    rate_in_cents = models.IntegerField(default=0)
    accepted = models.BooleanField(default=False)
    linkedin_url = models.URLField()

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = HeroManager()

    def __str__(self):
        return self.user.email

    def get_full_name(self):
        return "{0} {1}".format(self.user.first_name, self.user.last_name)

    def send_acceptance_email(self):
        # TODO change this when email is ready
        link = 'https://{0}/hero/{1}'.format(settings.WEB_DOMAIN, self.slug)
        context = {'hero_name': self.user.get_full_name(), 'link': link, 'type': 'accepted_hero'}

        subject, text, html = get_email(context)
        self.user.send_email(subject, text, html=html, email=self.user.email)

    def save(self, *args, **kwargs):
        if not self.pk:
            # Add slug for each hero view ex: hero-name then hero-name-1 if it's taken and so on
            count = 1
            slug = slugify(self.user.get_full_name())
            while self.__class__.objects.filter(slug=slug).exists():
                slug = slugify(self.user.get_full_name() + ' ' + str(count))
                count += 1
            self.slug = slug
        super().save(*args, **kwargs)


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

