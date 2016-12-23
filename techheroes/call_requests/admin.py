from django.conf import settings
from django.contrib import admin
from django.core import urlresolvers

from utils.functions import convert_utc_to_local_time

from .models import CallRequest, TimeSuggestion


class TimeSuggestionInline(admin.TabularInline):
    model = TimeSuggestion
    fields = ('user', 'timezone', 'time_1', 'time_2', 'time_3')
    readonly_fields = ('user', 'timezone', 'time_1', 'time_2', 'time_3')

    def timezone(self, obj):
        return obj.user.timezone

    def time_1(self, obj):
        return convert_utc_to_local_time(obj.datetime_one, obj.user.timezone)

    def time_2(self, obj):
        return convert_utc_to_local_time(obj.datetime_two, obj.user.timezone)

    def time_3(self, obj):
        return convert_utc_to_local_time(obj.datetime_three, obj.user.timezone)


class CallRequestAdmin(admin.ModelAdmin):
    date_hierarchy = 'updated'
    list_display = ('id', 'link_to_user', 'link_to_hero', 'status', 'created', 'updated')
    list_filter = ('status',)
    search_fields = ('user__email', 'hero__email')

    fields = ('id', 'user', 'hero', 'message', 'estimated_length', 'status', 'reason', 'agreed_time')
    readonly_fields = ('id', 'user', 'hero', 'message', 'estimated_length', 'status', 'reason', 'agreed_time')
    raw_id_fields = ('user', 'hero')
    inlines = [TimeSuggestionInline]

    def link_to_user(self, obj):
        link=urlresolvers.reverse("admin:accounts_user_change", args=[obj.user.id])
        return u'<a href="%s">%s</a>' % (link, obj.user)
    link_to_user.short_description = 'user'
    link_to_user.allow_tags=True

    def link_to_hero(self, obj):
        link=urlresolvers.reverse("admin:heroes_hero_change", args=[obj.hero.id])
        return u'<a href="%s">%s</a>' % (link, obj.hero)
    link_to_hero.short_description = 'hero'
    link_to_hero.allow_tags=True

    def created_in_chicago_time(self, obj):
        return convert_utc_to_local_time(obj.created, settings.COMPANY_TIMEZONE)
    created_in_chicago_time.short_description = 'created'


admin.site.register(CallRequest, CallRequestAdmin)