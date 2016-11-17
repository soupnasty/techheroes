from django.conf.urls import url

from heroes import views


urlpatterns = [
    url(r'^profile/?$', views.RetrieveUpdateHeroView.as_view(), name='retrieve_update_hero'),
    url(r'^apply/?$', views.ApplyForHeroView.as_view(), name='apply_hero'),
    url(r'^accept/?$', views.AcceptHeroView.as_view(), name='accept_hero'),
    url(r'^decline/?$', views.DeclineHeroView.as_view(), name='decline_hero'),

]