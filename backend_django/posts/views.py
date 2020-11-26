#Source: https://bezkoder.com/django-crud-mysql-rest-framework/

from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from posts.models import Genre, Post, Image
from posts.serializers import GenreSerializer, PostSerializer
from rest_framework.decorators import api_view


@api_view(['GET'])
def genres_list(request):
    if request.method == 'GET':
        
        """
        Querys with more than one row to serialize data
        """
        genre = Genre.objects.filter(show_menu_list='YES')
        post = Post.objects.filter(genres=genre)
        image = Image.objects.filter(post=post)
        
        name = request.GET.get('name', None)
        if name is not None:
            genre = Genre.filter(name__icontains=name)
        
        #Call class serializer for sending json data to frontend with Django REST API
        genre_serializer = GenreSerializer(genre, many=True)
        return JsonResponse(genre_serializer.data, safe=False)



@api_view(['GET'])
def posts_list(request):
    if request.method == 'GET':
        
        """
        Querys with more than one row to serialize data
        """
        post = Post.objects.filter(status='1')
        image = Image.objects.filter(post=post)
        
        name = request.GET.get('name', None)
        if name is not None:
            post = Genre.Post(title__icontains=title)
        
        #Call class serializer for sending json data to frontend with Django REST API
        post_serializer = PostSerializer(post, many=True)
        return JsonResponse(post_serializer.data, safe=False)