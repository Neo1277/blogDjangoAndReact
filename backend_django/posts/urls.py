from django.urls import path
from django.conf.urls import url 
from . import views

# Set end point for requests
app_name = 'posts'
urlpatterns = [
    url(r'api/genres$', views.GenresListView.as_view(), name='genres'),
    url(r'api/posts$', views.PostsListView.as_view(), name='posts'),
    url(r'api/featured_posts$', views.FeaturedPostsListView.as_view(), name='featured_posts'),
    url(r'api/comments$', views.CommentsView.as_view(), name='comments'),
    url(r'api/rate_posts$', views.PostRatingView.as_view(), name='rate_posts'),
    url(r'api/users', views.RegisterUserView.as_view(), name='users'),
    url(r'api/update_user/(?P<pk>\d+)/$', views.UpdateUserView.as_view(), name='update_user'),
    url(r'api/profile_images$', views.ProfileImagesListView.as_view(), name='profile_images'),
]