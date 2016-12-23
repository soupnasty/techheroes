from django.conf import settings
from django.contrib import admin

from utils.functions import convert_utc_to_local_time

from .models import Conference, ConferenceLog


class ConferenceLogInline(admin.TabularInline):
    model = ConferenceLog
    fields = ('user', 'action', 'timestamp')
    readonly_fields = ('user', 'action', 'timestamp')

    def user(self, obj):
        return obj.user if obj.user else None


class ConferenceAdmin(admin.ModelAdmin):
    ordering = ('-created',)
    date_hierarchy = 'created'
    list_display = ('sid', 'friendly_name', 'call_request', 'created')
    search_fields = ('sid', 'friendly_name')

    fields = ('sid', 'friendly_name', 'call_request', 'created')
    readonly_fields = ('sid', 'friendly_name', 'call_request', 'created')
    inlines = [ConferenceLogInline]

admin.site.register(Conference, ConferenceAdmin)