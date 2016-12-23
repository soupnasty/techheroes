from django.conf.urls import url

from . import views, webhooks


urlpatterns = [
    # Twilio Webhook
    url(r'^webhook/?$', webhooks.conference_call, name='twilio_conference'),

]