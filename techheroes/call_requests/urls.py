from django.conf.urls import url

from call_requests import views


urlpatterns = [
    # User Routes
    url(r'^$', views.CreateListCallRequestView.as_view(), name='create_list_call_request'),
    url(r'^(?P<pk>[0-9]+)/?$', views.RetrieveCallRequestView.as_view(), name='retrieve_call_request'),
    url(r'^(?P<pk>[0-9]+)/accept/?$', views.AcceptCallRequestHeroView.as_view(), name='accept_call_request'),
    url(r'^(?P<pk>[0-9]+)/decline/?$', views.DeclineCallRequestHeroView.as_view(), name='decline_call_request'),
    url(r'^(?P<pk>[0-9]+)/new-times/?$', views.NewTimeSuggestionsView.as_view(), name='new_time_suggestions'),
    url(r'^(?P<pk>[0-9]+)/agreed-time/?$', views.AgreedTimeSuggestionView.as_view(), name='accepted_time_suggestion'),
    url(r'^(?P<pk>[0-9]+)/cancel/?$', views.CancelCallRequestView.as_view(), name='cancel_call_request'),

]