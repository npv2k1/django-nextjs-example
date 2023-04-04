from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter


class ProductViewSet(ModelViewSet):
    http_method_names = ['get']
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name']


@api_view(['GET'])
def check_inventory(request, name, quantity):
    print(name)
    print(quantity)
    try:
        product = Product.objects.get(name=name)
        if product.quantity >= quantity:
            serializer = ProductSerializer(product)
            return Response({'message': 'hàng có sẵn'})
        else:
            return Response({'message': 'hàng không có sẵn'})
    except Product.DoesNotExist:
        return Response({'message': 'Product not found'})


@api_view(['GET'])
def get_SP(request):
    sp = Product.objects.all()
    serializer = ProductSerializer(sp, many=True)
    return Response(serializer.data)
