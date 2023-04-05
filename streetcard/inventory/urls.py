from django.urls import path
from inventory import views

urlpatterns = [
    path("inventory/", views.inventory, name="inventory"),
    path("inventory/entry/", views.entry, name="entry"),
    path("inventory/update_item/<item_id>/", views.updateitem, name="updateitem"),
    # path("checkout/", views.checkout, name="checkout"),
    # path("checkout/<client_id>", views.checkout, name="checkout")
]