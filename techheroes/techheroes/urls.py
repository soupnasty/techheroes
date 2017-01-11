from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.views import generic
from django.views.decorators.cache import cache_page

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/heroes/', include('heroes.urls', namespace='heroes')),
    url(r'^api/v1/call-requests/', include('call_requests.urls', namespace='call_requests')),
    url(r'^api/v1/conferences/', include('conferences.urls', namespace='conferences')),

    url(r'', generic.TemplateView.as_view(template_name='index.html')),  
]
