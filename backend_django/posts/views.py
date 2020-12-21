from django.shortcuts import render

from django.http.response import JsonResponse
 
from posts.models import Genre, Post, Image, Comment

from posts.serializers import GenreSerializer, PostSerializer, CommentSerializer

from datetime import datetime

from rest_framework.parsers import JSONParser
from rest_framework import status, generics

# Class-based Views
# https://www.django-rest-framework.org/tutorial/3-class-based-views/#tutorial-3-class-based-views

"""
Applying inheritance to classes
"""
# Generic class-based views for genres list requests

class GenresListView(generics.ListAPIView):
    serializer_class = GenreSerializer

    def get_queryset(self):
        """
        Querys with more than one row to serialize data
        Populate genres and posts nested
        """
        genre = Genre.objects.filter(show_menu_list='YES')
        post = Post.objects.filter(status='1', genres=genre)
        return genre


# Generic class-based views for posts list requests

class PostsListView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        """
        Querys with more than one row to serialize data
        Populate posts and images nested
        """
        post = Post.objects.filter(status='1').order_by('-created_on')
        image = Image.objects.filter(post=post)
        return post


# Generic class-based views forFeatured  posts list requests
class FeaturedPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        """
        Querys with more than one row to serialize data
        Populate posts and images nested
        """
            #Current date and time
        current_date = datetime.now()
        
        #Filter featured posts: current datetime between datetimes fields in the database
        post = Post.objects.filter(status='1', initial_featured_date__lte = current_date, end_featured_date__gte = current_date)

        image = Image.objects.filter(post=post)
        return post


class CommentsView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    """
    Save comment
    
    Link Separate permissions per methods:
    https://stackoverflow.com/a/19784496/9655579
    """

    def get_queryset(self):
        """
        Querys with more than one row to serialize data
        """
        #Get all comments
        comment = Comment.objects.all()
        return comment

