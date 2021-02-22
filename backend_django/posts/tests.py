from django.urls import include, path, reverse
from rest_framework.test import APITestCase, URLPatternsTestCase
from rest_framework import status
from .models import Genre, Post

from django.contrib.auth.models import User

def create_genre(genre_data):
    """
    Create a genre with the given `genre_data` dictionary
    """

    return Genre.objects.create(**genre_data)

def create_post(post_data):
    """
    Create a post with the given `post_data` dictionary
    """

    return Post.objects.create(**post_data)


def create_user(username, email, password):
    """
    Create a user with the given parameters
    """

    return User.objects.create_user(username, email, password)

class PostsTest(APITestCase):

    def set_new_objects(self):
        """
        Ensure we can create a new object.
        """

        username = 'paula'
        email = 'paula@gmail.com'
        password = 'mypasswprd123'

        user = create_user(username, email, password)

        genre_data = {
            'name': 'Movies',
            'slug':'movies',
            'description':   'description of Movies',
            'show_menu_list':'YES'
        }

        genre = create_genre(genre_data)

        post_data = {
            'title': 'Spiderman 3',
            'slug':'spiderman',
            'description':   'description of spiderman',
            'status': 1,
            'country':'US',
            'image_post':'posts/2f474f0e-1168-4f00-b123-2556c30cf385.jpg',
            'author_id': user.id
        }

        post = create_post(post_data)
        post.genres.add(genre)

    def test_genres_get_endpoint(self):

        url = reverse('posts:genres')

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_posts_get_endpoint(self):

        url = reverse('posts:posts')

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_featured_posts_get_endpoint(self):

        url = reverse('posts:featured_posts')

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# https://www.django-rest-framework.org/api-guide/testing/#example_1
# https://docs.djangoproject.com/en/3.1/intro/tutorial05/#testing-the-detailview