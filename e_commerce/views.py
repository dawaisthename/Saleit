from rest_framework import generics
from .models import  Category, Product, Cart, Cartitems, Review, Image
from rest_framework import viewsets
from .serializers import  CategorySerializer, ProductSerializer, CartSerializer, ReviewSerializer, ImageSerializer,CartItemSerializer,AddCartItemSerializer



# Views for Category
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Views for Product
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
class ProductsByCategoryAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
            category_name = self.kwargs['category_name']  # Assuming you pass the category name in the URL
            category = Category.objects.get(name=category_name)
            queryset = Product.objects.filter(category=category)
            return queryset

# Views for Cart
class CartListCreateView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    

class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

# views for cartitem
class CartItemCreatView(generics.ListCreateAPIView):
  
    lookup_field = 'id'
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return AddCartItemSerializer
        
        return CartItemSerializer
    
    def get_serializer_context(self):
        return {"cart_id": self.kwargs["pk"]}
    def get_queryset(self):
        cart_pk = self.kwargs['pk']
        return Cartitems.objects.filter(cart=cart_pk)
class CartItemsDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemSerializer
    queryset = Cartitems.objects.all()
    lookup_field = 'id'
     

# Views for Review
class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

# Views for Image
class ImageListCreateView(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

class ImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer