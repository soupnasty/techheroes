from django.conf.urls import include, url
from django.contrib import admin


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/heroes/', include('heroes.urls', namespace='heroes')),
    url(r'^api/v1/call-requests/', include('call_requests.urls', namespace='call_requests')),
    url(r'^api/v1/webhooks/', include('webhooks.urls', namespace='webhooks')),

]
