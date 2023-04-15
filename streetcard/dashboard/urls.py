from django.urls import path
from dashboard import views

urlpatterns = [
    # path("dashboard/", views.dashboard , name="dashboard"),
    path("dashboard/<client_id>/", views.dashboard , name="dashboard"),
]