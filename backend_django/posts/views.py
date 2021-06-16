from django.http.response import JsonResponse
 
from posts.models import Genre, Post, Image, Comment, PostRating, Round

from posts.serializers import (
    GenreSerializer,
    PostSerializer,
    CommentSerializer,
    MyTokenObtainPairSerializer,
    RegisterUserSerializer,
    PostRatingSerializer
)

from datetime import datetime

from rest_framework.parsers import JSONParser
from rest_framework import status, generics, permissions

from rest_framework_simplejwt.views import TokenObtainPairView

from django.db.models import Avg, F

# Class-based Views
# https://www.django-rest-framework.org/tutorial/3-class-based-views/#tutorial-3-class-based-views

"""
Applying inheritance to classes
"""

class RegisterUserView(generics.CreateAPIView):
    serializer_class = RegisterUserSerializer

# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/customizing_token_claims.html#customizing-token-claims
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Generic class-based views for genres list requests
class GenresListView(generics.ListAPIView):
    serializer_class = GenreSerializer

    """
    Querys with more than one row to serialize data
    Populate genres and posts nested
    """
    queryset = Genre.objects.filter(show_menu_list='YES')

# Generic class-based views for posts list requests
class PostsListView(generics.ListAPIView):
    serializer_class = PostSerializer

    """
    Querys with more than one row to serialize data
    Populate posts and images nested
    
    Calculate average of rating and round to the nearest integer
    https://stackoverflow.com/a/51645709
    """
    queryset = Post.objects.filter(
        status='1'
    ).order_by('-created_on').annotate(
        avg_rating=Round(Avg(F('ratingps__rating')))
    )

    # https://docs.djangoproject.com/en/3.2/ref/models/expressions/#subquery-expressions
    # https://docs.djangoproject.com/en/3.2/topics/db/queries/#expressions-can-reference-transforms

# Generic class-based views forFeatured  posts list requests
class FeaturedPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        """
        Querys with more than one row to serialize data
        Populate posts and images nested
        """
        # Current date and time
        current_date = datetime.now()
        
        # Filter featured posts: current datetime between datetimes fields in the database
        post = Post.objects.filter(status='1', initial_featured_date__lte = current_date, end_featured_date__gte = current_date)

        return post


class CommentsView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    """
    Save comment
    IsAuthenticatedOrReadOnly
    https://www.django-rest-framework.org/api-guide/permissions/#isauthenticatedorreadonly
    """


class PostRatingView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = PostRatingSerializer
    queryset = PostRating.objects.all()

    """
    IsAuthenticatedOrReadOnly
    https://www.django-rest-framework.org/api-guide/permissions/#isauthenticatedorreadonly
    """
