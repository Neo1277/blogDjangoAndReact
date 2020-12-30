from rest_framework import serializers 
from posts.models import Genre, Post, Image, Comment
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

"""
Serialize data to send it with json format
"""

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Customizing JWT response from django-rest-framework-simplejwt
    https://stackoverflow.com/a/55859751/9655579
    """
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Add extra responses here
        data['user_id'] = self.user.id
        data['username'] = self.user.username
        #data['groups'] = self.user.groups.values_list('name', flat=True)
        return data

#Serialize genres nested array
class GenrePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('__all__')

#Serialize Image nested array
class ImageSerializer(serializers.ModelSerializer):
    #Set alias for field. Source: https://stackoverflow.com/a/43492545/9655579
    title = serializers.CharField(source='name')

    class Meta:
        model = Image
        fields = ['id','image_post','title','description']

#Serialize comments
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
        fields = ['id',
                  'title',
                  'slug',
                  'description',
                  'author',
                  'updated_on',
                  'genres',
                  'content',
                  'created_on',
                  'status',
                  'url_website',
                  'url_video',
                  'director',
                  'country',
                  'image_post',
                  'imageps']

#Parent array nested objects genres
class GenreSerializer(serializers.ModelSerializer):
    
    #Put post data inside genres as a nested array
    postsgen = PostSerializer(read_only=True,many=True)
    
    class Meta:
        model = Genre
        fields = ['id',
                  'name',
                  'slug',
                  'description',
                  'show_menu_list',
                  'image_genre',
                  'postsgen']
