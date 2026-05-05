from django.urls import path

from . import views


urlpatterns = [
    path("health/", views.health),
    path("auth/signup/", views.signup),
    path("auth/signin/", views.signin),
    path("auth/signout/", views.signout),
    path("auth/me/", views.me),
    path("hepato-analyze/", views.hepato_analyze),
    path("hepato-advice/", views.hepato_advice),
    path("analyse/", views.general_analyze),
    path("advice/", views.general_advice),
    path("analyses/", views.analysis_history),
]
