from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
   
    CategoryListCreateView, CategoryDetailView,
    ProductListCreateView, ProductDetailView,
    CartListCreateView, CartDetailView,
    CartItemCreatView,CartItemsDetailView,
    ReviewListCreateView, ReviewDetailView,
    ImageListCreateView, ImageDetailView,
    ProductsByCategoryAPIView,
)

urlpatterns = [
 
    # Category URLs
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),

    # Product URLs
    path('', ProductListCreateView.as_view(), name='product-list-create'),
    path('product/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('category/<str:category_name>/', ProductsByCategoryAPIView.as_view(), name='products-by-category'),

    # Cart URLs
    path('carts/', CartListCreateView.as_view(), name='cart-list-create'),
    path('carts/<uuid:pk>/', CartDetailView.as_view(), name='cart-detail'),

    #cartItems
    path('carts/<uuid:pk>/cartitems', CartItemCreatView.as_view(), name='cartitem'),
    path('carts/<uuid:pk>/cartitems/<uuid:id>',CartItemsDetailView.as_view(),name="cartitem-detail"),

    # Review URLs
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('reviews/<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),

    # Image URLs
    path('images/', ImageListCreateView.as_view(), name='image-list-create'),
    path('images/<int:pk>/', ImageDetailView.as_view(), name='image-detail'),
]

