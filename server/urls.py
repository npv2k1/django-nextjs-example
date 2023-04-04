from django.urls import path
from .views import check_inventory,get_SP

urlpatterns = [
    path('check_inventory/<str:name>/<int:quantity>/', check_inventory),
    path('product', get_SP),
]