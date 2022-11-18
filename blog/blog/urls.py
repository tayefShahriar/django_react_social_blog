from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from app.views import PostView, ProfileView, RegisterView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token
route = routers.DefaultRouter()
route.register("", PostView, basename="home")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("app/", include(route.urls)),
    path("profile/", ProfileView.as_view()),
    path("login/", obtain_auth_token),
    path("register/", RegisterView.as_view())
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)