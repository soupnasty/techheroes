from django.conf.urls import include, url


urlpatterns = [
    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/heroes/', include('heroes.urls', namespace='heroes')),

]
