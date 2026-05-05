from django.contrib import admin
from django.urls import include, path

from api.views import root


urlpatterns = [
    path("", root),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]
