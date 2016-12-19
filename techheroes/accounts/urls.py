from django.conf.urls import url

from accounts import views


urlpatterns = [
    url(r'^phone-token/?$', views.CreatePhoneTokenView.as_view(), name='create_phone_token'),
    url(r'^register/?$', views.RegisterUserView.as_view(), name='register_user'),
    url(r'^login/?$', views.LoginUserView.as_view(), name='login'),
    url(r'^logout/?$', views.LogoutUserView.as_view(), name='logout'),
    url(r'^verify-email/?$', views.VerifyEmailUserView.as_view(), name='verify_email'),
    url(r'^verify-phone/?$', views.VerifyPhoneUserView.as_view(), name='verify_phone'),
    url(r'^change-password/?$', views.ChangePasswordUserView.as_view(), name='change_password'),
    url(r'^request-password/?$', views.RequestPasswordUserView.as_view(), name='request_password'),
    url(r'^reset-password/?$', views.ResetPasswordUserView.as_view(), name='reset_password'),
    url(r'^profile/?$', views.RetrieveUpdateUserView.as_view(), name='retrieve_update_user'),
    url(r'^get-time/?$', views.GetTimeForUserView.as_view(), name='get_time_user'),
]