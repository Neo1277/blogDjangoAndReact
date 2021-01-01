from django.db import models
from django_countries.fields import CountryField
from django.contrib.auth.models import User
import uuid
import os

"""
Generate unique name for each image in the folder posts
Source: https://stackoverflow.com/a/2677474/9655579
"""
def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('posts', filename)

#Source: Model field reference https://docs.djangoproject.com/en/3.1/ref/models/fields/#django.db.models.DateTimeField
class Genre(models.Model):

    #Text that will be shown in Django Admin fields for this model
    SHOW = 'YES'
    NOTSHOW = 'NO'
    SHOW_MENU_LIST_CHOICES = [
        (SHOW, 'Show in menu list'),
        (NOTSHOW, 'Not show in menu list'),
    ]

    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.CharField(max_length=200, null=True, blank=True)

    #Add data with text to the field
    show_menu_list = models.CharField(
        max_length=3,
        choices=SHOW_MENU_LIST_CHOICES,
        default=NOTSHOW,
    )
    image_genre = models.ImageField(upload_to=get_file_path, null=True, blank=True)

    def __str__(self):
        return self.name

class Post(models.Model):

    STATUS = (
        (0,"Draft"),
        (1,"Publish")
    )

    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete= models.CASCADE,related_name='posts')
    updated_on = models.DateTimeField(auto_now= True)

    #Field for many to many relation and set related name to serialize data with json
    genres = models.ManyToManyField(Genre,related_name='postsgen')
    content = models.TextField()
    
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)
    url_website = models.URLField(max_length=200, null=True, blank=True)
    url_video = models.URLField(max_length=200, null=True, blank=True)
    director = models.CharField(max_length=200, null=True, blank=True)

    #Field from django_countries library to get a list of countries and associate the post with it
    country = CountryField()
    
    image_post = models.ImageField(upload_to=get_file_path)

    #Date fields for featured posts
    initial_featured_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    end_featured_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE,related_name='commentps')
    author = models.ForeignKey(User, on_delete= models.CASCADE,related_name='commentus')
    content = models.TextField()
    datetime = models.DateTimeField(auto_now_add=True)
    answer_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

class Image(models.Model):
    #Field for one to many relation and set related name to serialize data with json
    post = models.ForeignKey(Post, on_delete=models.CASCADE,related_name='imageps')
    image_post = models.ImageField(upload_to=get_file_path)
    name = models.CharField(max_length=200, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    
    def __str__(self):
        return self.post.title