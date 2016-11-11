from django.conf.urls import url

from accounts import views


urlpatterns = [
    url(r'^profile/?$', views.RetrieveUpdateUserView.as_view(), name='retrieve_update_user'),
    url(r'^register/?$', views.RegisterUserView.as_view(), name='register'),
    url(r'^login/?$', views.LoginUserView.as_view(), name='login'),
    url(r'^logout/?$', views.LogoutUserView.as_view(), name='logout'),
]