from django.urls import path
from django.conf.urls import url 
from . import views

#Set end point for requests
urlpatterns = [
    url(r'^api/genres$', views.genres_list),
    url(r'^api/posts$', views.posts_list),
    url(r'^api/featured_posts$', views.featured_posts_list),
    url(r'^api/comments$', views.comments)
]