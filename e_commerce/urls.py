from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    CustomUserListCreateView, CustomUserDetailView,
    CategoryListCreateView, CategoryDetailView,
    ProductListCreateView, ProductDetailView,
    CartListCreateView, CartDetailView,
    OrderListCreateView, OrderDetailView,
    OrderDetailsListCreateView, OrderDetailsDetailView,
    ReviewListCreateView, ReviewDetailView,
    ImageListCreateView, ImageDetailView,
    ProductsByCategoryAPIView,
)

urlpatterns = [
    # CustomUser URLs
    path('customusers/', CustomUserListCreateView.as_view(), name='customuser-list-create'),
    path('customusers/<int:pk>/', CustomUserDetailView.as_view(), name='customuser-detail'),

    # Category URLs
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),

    # Product URLs
    path('', ProductListCreateView.as_view(), name='product-list-create'),
    path('product/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('category/<str:category_name>/', ProductsByCategoryAPIView.as_view(), name='products-by-category'),

    # Cart URLs
    path('carts/', CartListCreateView.as_view(), name='cart-list-create'),
    path('carts/<int:pk>/', CartDetailView.as_view(), name='cart-detail'),

    # Order URLs
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),

    # OrderDetails URLs
    path('orderdetails/', OrderDetailsListCreateView.as_view(), name='orderdetails-list-create'),
    path('orderdetails/<int:pk>/', OrderDetailsDetailView.as_view(), name='orderdetails-detail'),

    # Review URLs
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('reviews/<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),

    # Image URLs
    path('images/', ImageListCreateView.as_view(), name='image-list-create'),
    path('images/<int:pk>/', ImageDetailView.as_view(), name='image-detail'),
]

