from rest_framework import serializers 
from posts.models import Genre, Post, Image, Comment

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
    #Set alias for field. Source: https://stackoverflow.com/a/43492545/9655579
    title = serializers.CharField(source='name')

    class Meta:
        model = Image
        fields = ['id','image_post','title','description']

#Serialize comments for nested array
class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('__all__')

class PostSerializer(serializers.ModelSerializer):
    
    #Put genres data inside postsgen as a nested array
    genres = GenrePostSerializer(read_only=True,many=True)

    #Put images data inside postsgen as a nested array
    imageps = ImageSerializer(read_only=True,many=True)

    class Meta:
        model = Post
        fields = ['id','title', 'slug','description','author','updated_on','genres','content','created_on','status','url_website','url_video','director','country','image_post','imageps']

#Parent array nested objects genres
class GenreSerializer(serializers.ModelSerializer):
    
    #Put post data inside genres as a nested array
    postsgen = PostSerializer(read_only=True,many=True)
    
    class Meta:
        model = Genre
        fields = ['id','name', 'slug','description','show_menu_list','image_genre','postsgen']
