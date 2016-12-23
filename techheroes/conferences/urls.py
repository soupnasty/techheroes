from django.conf.urls import url

from . import views, webhooks


urlpatterns = [
    url(r'^$', views.ListConferencesView.as_view(), name='list_conferences_view'),
    url(r'^(?P<pk>[^/]+)/?$', views.RetrieveConferenceView.as_view(), name='retrieve_conference_view'),

    # Twilio Webhooks
    url(r'^webhook/join/?$', webhooks.conference_call, name='join_twilio_conference'),
    url(r'^webhook/event/?$', webhooks.log_event, name='log_twilio_conference_event'),

]