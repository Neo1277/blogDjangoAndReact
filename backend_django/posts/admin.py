"""
Set Modules that will be included on Django admin page
"""

from django.contrib import admin

from .models import Genre, Post, Image, Comment

admin.site.register(Genre)
admin.site.register(Post)
admin.site.register(Image)
admin.site.register(Comment)