from django.conf.urls import url

from heroes import views


urlpatterns = [
    url(r'^profile/?$', views.RetrieveUpdateHeroView.as_view(), name='retrieve_update_hero'),
    url(r'^apply/?$', views.ApplyForHeroView.as_view(), name='apply_hero'),

]