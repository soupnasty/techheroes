from django.conf.urls import url

from webhooks import views


urlpatterns = [
    # Twilio Webhooks
    url(r'^twilio-voice/?$', views.conference_call, name='twilio_conference_call'), 


]