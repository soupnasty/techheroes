from django.conf import settings
from django.contrib import admin

from utils.functions import convert_utc_to_local_time

from .models import Hero, HeroAcceptAction


class HeroAdmin(admin.ModelAdmin):
    date_hierarchy = 'created'
    list_display = ('user', 'slug', 'discipline', 'accepted', 'staff_who_accepted_hero',
                    'accepted_datetime', 'created_in_local_time')

    def staff_who_accepted_hero(self, obj):
        if HeroAcceptAction.objects.filter(hero=obj).exists():
            return HeroAcceptAction.objects.filter(hero=obj).latest('timestamp').user
        return None
    staff_who_accepted_hero.short_description = 'accepted by'

    def accepted_datetime(self, obj):
        if HeroAcceptAction.objects.filter(hero=obj).exists():
            utc_time = HeroAcceptAction.objects.filter(hero=obj).latest('timestamp').timestamp
            return convert_utc_to_local_time(utc_time, settings.COMPANY_TIMEZONE)
        return None
    accepted_datetime.short_description = 'accepted on'

    def created_in_local_time(self, obj):
        return convert_utc_to_local_time(obj.created, settings.COMPANY_TIMEZONE)
    created_in_local_time.short_description = 'created on'


admin.site.register(Hero, HeroAdmin)