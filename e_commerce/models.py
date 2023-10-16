from django.contrib.auth.models import AbstractUser
from django.db import models

import decimal

class CustomUser(AbstractUser):
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)


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
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    For = models.CharField(max_length=100)
    image_url = models.URLField()

    def __str__(self):
        return self.title

class Cart(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Order(models.Model):
    customer = models.ForeignKey(CustomUser,on_delete=models.SET_NULL,blank=True,null=True)
    date_ordered =models.DateTimeField(auto_now_add=True)
    compelete = models.BooleanField(default=False,null=True,blank=False)
    transaction_id =models.CharField(max_length=200,null =True)
    @property
    def vat(self):
        vat = self.get_cart_total * decimal.Decimal('1.05')
        return vat
    @property
    def get_cart_total(self):
        orderitems = self.orderitem_set.all()
        total = sum ([item.get_total for item in orderitems])
        return total
    @property
    def get_cart_items(self):
        orderitems = self.orderitem_set.all()
        total = sum ([item.quantity for item in orderitems])
        return total
    def __str__(self):
        return str(self.id) 
class OrderItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,blank=True,null=True)
    order= models.ForeignKey(Order,on_delete=models.SET_NULL,blank=True,null=True)
    quantity = models.IntegerField(default=0,blank=True,null=True)
    date_added =models.DateTimeField(auto_now_add=True)

    @property
    def get_total(self):
        total= self.product.unit_price * self.quantity
        return total
class Review(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    url = models.URLField()