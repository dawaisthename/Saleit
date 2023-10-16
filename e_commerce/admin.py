from django.contrib import admin
from .models import CustomUser, Category, Product, Cart, Order, OrderItem, Review, Image


admin.site.register(CustomUser)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Review)
admin.site.register(Image)