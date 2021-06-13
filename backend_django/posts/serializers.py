from rest_framework import serializers
from django.contrib.auth.models import User
from posts.models import Genre, Post, Image, Comment, PostRating
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

"""
Serializers to send or save data from models
"""

class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username','first_name','last_name','email','password']
        write_only_fields = ('password',)

    """
    Validaations for user registration and set secure password
    Source:
    https://stackoverflow.com/a/29867704/9655579
    """
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

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
    """
    Get username field from User model, one to many relation (author field)
    https://stackoverflow.com/a/46499968/9655579
    """
    username = serializers.CharField(read_only=True, source="author.username")

    class Meta:
        model = Comment
        fields = ['author', 'post','content','datetime', 'username']

class PostSerializer(serializers.ModelSerializer):
    
    #Put genres data inside postsgen as a nested array
    genres = GenrePostSerializer(read_only=True,many=True)

    #Put images data inside postsgen as a nested array
    imageps = ImageSerializer(read_only=True,many=True)

    avg_rating = serializers.FloatField(read_only=True)

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
                  'imageps',
                  'avg_rating']

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

#Serialize rating
class PostRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostRating
        fields = ['post',
                  'author',
                  'rating']