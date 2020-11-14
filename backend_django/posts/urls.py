from django.urls import path
from django.conf.urls import url 
from . import views

#Set endpoint for requests
urlpatterns = [
    url(r'^api/posts$', views.posts_list)
]