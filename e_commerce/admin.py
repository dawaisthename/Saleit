from django.contrib import admin
from .models import  Category, Product, Cart, Cartitems, Review, Image


admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Cartitems)
admin.site.register(Review)
admin.site.register(Image)