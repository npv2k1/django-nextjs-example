from django.urls import path
from .views import check_inventory, get_SP
from rest_framework_nested import routers
from .views import ProductViewSet
router = routers.DefaultRouter()
router.register('products', ProductViewSet, basename='products')
urlpatterns = router.urls + [
    path('check_inventory/<str:name>/<int:quantity>/', check_inventory),
    path('product', get_SP),
]
