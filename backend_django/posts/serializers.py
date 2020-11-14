#Source: https://bezkoder.com/django-crud-mysql-rest-framework/

from rest_framework import serializers 
from posts.models import Genre, Post, Image

"""
Serialize data to send it with json format
"""

#Serialize genres for nested array
class GenrePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('__all__')

#Serialize Image for nested array
class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = ('__all__')

class PostSerializer(serializers.ModelSerializer):
    
    #Put genres data inside postsgen as a nested array
    genres = GenrePostSerializer(read_only=True,many=True)

    #Put imges data inside postsgen as a nested array
    imageps = ImageSerializer(read_only=True,many=True)

    class Meta:
        model = Post
        fields = ['id','title', 'slug','description','author','updated_on','genres','content','created_on','status','url_website','url_video','director','country','image_post','imageps']

#Parent array in the hierarchy of nested arrays json format
class GenreSerializer(serializers.ModelSerializer):
    
    #Put post data inside genres as a nested array
    postsgen = PostSerializer(read_only=True,many=True)
    
    class Meta:
        model = Genre
        fields = ['id','name', 'slug','description','show_menu_list','image_genre','postsgen']
