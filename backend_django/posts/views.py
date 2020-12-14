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
        Populate genres and posts nested
        """
        try:
            genre = Genre.objects.filter(show_menu_list='YES')
            post = Post.objects.filter(status='1', genres=genre)

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
        Populate posts and images nested
        order posts descending order
        Source official documentation:
        https://docs.djangoproject.com/en/3.1/ref/models/querysets/#django.db.models.query.QuerySet.order_by
        """

        try:        
            post = Post.objects.filter(status='1').order_by('-created_on')
            image = Image.objects.filter(post=post)

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
        Populate posts and images nested
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
@api_view(['GET', 'POST'])
def comments(request):
    if request.method == 'GET':
        
        """
        Querys with more than one row to serialize data
        """

        try:
            #Get all comments
            comment = Comment.objects.all()
            
        except Comment.DoesNotExist: 
            return JsonResponse({'message': 'The request does not match the records'}, status=status.HTTP_404_NOT_FOUND)
        
        #Call class serializer for sending json data to frontend with Django REST API
        comment_serializer = CommentSerializer(comment, many=True)
        return JsonResponse(comment_serializer.data, safe=False)    
    elif request.method == 'POST':
        
        """
        Save comment
        """
        comment_data = JSONParser().parse(request)
        comment_serializer = CommentSerializer(data=comment_data)
        if comment_serializer.is_valid():
            comment_serializer.save()
            return JsonResponse(comment_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)