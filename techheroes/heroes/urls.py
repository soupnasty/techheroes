from django.conf.urls import url

from heroes import views


urlpatterns = [
    # Hero's personal routes
    url(r'^profile/?$', views.RetrieveUpdateHeroView.as_view(), name='retrieve_update_hero'),
    url(r'^apply/?$', views.ApplyForHeroView.as_view(), name='apply_hero'),
    # Public routes
    url(r'^list/?$', views.GetHeroListView.as_view(), name='list_heros'),
    # Staff routes
    url(r'^accept/?$', views.AcceptHeroView.as_view(), name='accept_hero'),
    url(r'^decline/?$', views.DeclineHeroView.as_view(), name='decline_hero'),

]