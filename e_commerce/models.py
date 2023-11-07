
from django.db import models
import uuid

import decimal



class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    condition = models.CharField(max_length=20)
    brand = models.CharField(max_length=50)
    size = models.CharField(max_length=10)
    color = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name='products',on_delete=models.CASCADE)
    For = models.CharField(max_length=100)
    image_url = models.URLField()

    def __str__(self):
        return self.title

class Cart(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return str(self.id)

class Cartitems(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items",blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True, related_name='cartitems')
    quantity = models.PositiveSmallIntegerField(default=0)
class Review(models.Model):
    # user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    url = models.URLField()