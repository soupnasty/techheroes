from django.conf import settings
from django.contrib import admin

from utils.functions import convert_utc_to_local_time

from .models import User


class UserAdmin(admin.ModelAdmin):
    ordering = ('-created',)
    date_hierarchy = 'created'
    list_display = ('email', 'first_name', 'last_name', 'email_verified', 'timezone', 'created_in_chicago_time')
    fields = ('first_name', 'last_name', 'email', 'email_verified',
        'email_notifications', 'phone', 'phone_verified', 'profile_image', 'timezone')

    def created_in_chicago_time(self, obj):
        return convert_utc_to_local_time(obj.created, settings.COMPANY_TIMEZONE)
    created_in_chicago_time.short_description = 'created on'


admin.site.register(User, UserAdmin)