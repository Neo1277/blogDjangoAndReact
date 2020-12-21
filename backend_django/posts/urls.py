from django.urls import path
from django.conf.urls import url 
from . import views

#Set end point for requests
urlpatterns = [
    url(r'api/genres$', views.GenresListView.as_view()),
    url(r'api/posts$', views.PostsListView.as_view()),
    url(r'api/featured_posts$', views.FeaturedPostsListView.as_view()),
    url(r'api/comments$', views.CommentsView.as_view()),
]