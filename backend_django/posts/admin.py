"""
Set Modules that will be included on Django admin page
"""

from django.contrib import admin

from .models import Genre, Post, Image, Comment

# Change name django administration page
admin.site.site_title = "Blog"
admin.site.site_header = "Django Blog administration"
admin.site.index_title = "Blog administration"

admin.site.register(Genre)
admin.site.register(Post)
admin.site.register(Image)
admin.site.register(Comment)