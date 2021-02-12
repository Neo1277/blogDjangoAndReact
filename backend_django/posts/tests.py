from django.urls import include, path, reverse
from rest_framework.test import APITestCase, URLPatternsTestCase
from rest_framework import status
from .models import Genre, Post

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

class AccountTests(APITestCase):

    def test_genres_get_endpoint(self):
        """
        Ensure we can create a new genre object.
        """
        genre_data = {
            'name': 'Movies',
            'slug':'movies',
            'description':   'description of Movies',
            'show_menu_list':'YES'
        }

        genre = create_genre(genre_data)

        """
        post_data = {
            'title': 'Spiderman 3',
            'slug':'spiderman',
            'description':   'description of spiderman',
            'status': 1,
            'country':'US',
            'image_post':'posts/2f474f0e-1168-4f00-b123-2556c30cf385.jpg',
            'author_id': 1
        }

        create_post(post_data)
        """

        url = reverse('posts:genres')

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# https://www.django-rest-framework.org/api-guide/testing/#example_1
# https://docs.djangoproject.com/en/3.1/intro/tutorial05/#testing-the-detailview