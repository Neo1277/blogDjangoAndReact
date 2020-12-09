#Source: https://bezkoder.com/django-crud-mysql-rest-framework/

from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from posts.models import Genre, Post, Image, Comment
from posts.serializers import GenreSerializer, PostSerializer, CommentSerializer
from rest_framework.decorators import api_view

from datetime import datetime

#Function for genres list requests
@api_view(['GET'])
def genres_list(request):
    if request.method == 'GET':
        
        """
        Querys with more than one row to serialize data
        """
        try:
            genre = Genre.objects.filter(show_menu_list='YES')
            post = Post.objects.filter(status='1', genres=genre)
            image = Image.objects.filter(post=post)

        except Genre.DoesNotExist or Post.DoesNotExist or image.DoesNotExist: 
            return JsonResponse({'message': 'The request does not match the records'}, status=status.HTTP_404_NOT_FOUND)
        
        
        #Call class serializer for sending json data to frontend with Django REST API
        genre_serializer = GenreSerializer(genre, many=True)
        return JsonResponse(genre_serializer.data, safe=False)


#Function for posts list requests
@api_view(['GET'])
def posts_list(request):
    if request.method == 'GET':
        
        """
        Querys with more than one row to serialize data
        """

        try:        
            post = Post.objects.filter(status='1')
            image = Image.objects.filter(post=post)
            comment = Comment.objects.filter(post=post)

        except Post.DoesNotExist or Image.DoesNotExist: 
            return JsonResponse({'message': 'The request does not match the records'}, status=status.HTTP_404_NOT_FOUND)
        
        
        #Call class serializer for sending json data to frontend with Django REST API
        post_serializer = PostSerializer(post, many=True)
        return JsonResponse(post_serializer.data, safe=False)

#Function for featured posts requests
@api_view(['GET'])
def featured_posts_list(request):
    if request.method == 'GET':
        
        """
        Querys with more than one row to serialize data
        Sources:

        https://stackoverflow.com/a/48264548/9655579

        https://stackoverflow.com/a/10040165/9655579
        """

        try:
            #Current date and time
            current_date = datetime.now()
            
            #Filter featured posts: current datetime between datetimes fields in the database
            post = Post.objects.filter(status='1', initial_featured_date__lte = current_date, end_featured_date__gte = current_date)

            image = Image.objects.filter(post=post)
            
        except Post.DoesNotExist or Image.DoesNotExist: 
            return JsonResponse({'message': 'The request does not match the records'}, status=status.HTTP_404_NOT_FOUND)
        
        #Call class serializer for sending json data to frontend with Django REST API
        post_serializer = PostSerializer(post, many=True)
        return JsonResponse(post_serializer.data, safe=False)

#Function for comments
@api_view(['POST'])
def comments(request):
    if request.method == 'POST':
        
        """
        Save comment
        """
        comment_data = JSONParser().parse(request)
        comment_serializer = CommentSerializer(data=comment_data)
        if comment_serializer.is_valid():
            comment_serializer.save()
            return JsonResponse(comment_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)