# Django and React integration #

This web application consists on a basic personal blog to make posts, to create categories, this also includes featured posts shown on slider, user registration, login, comments on each post by logged in users, rate post with stars by logged in users, calculate average rating as well, and uploading content of categories and posts (text and images) using Django admin and the data is shown on a react frontend application.

## Examples (images) ##
[Demo (image 1)](https://user-images.githubusercontent.com/59356298/103450354-23347800-4c83-11eb-85d9-bdad72bfdb16.png "demo 1")  
[Demo (image 2)](https://user-images.githubusercontent.com/59356298/103450370-68f14080-4c83-11eb-968d-429126c37ee8.png "demo 2")

## Programming languages (frameworks, libraries) ##
*   Django (Django rest framework, Django models, Django admin, JSON, serialization, Simple JSON Web Token authentication)
*   Reactjs (HTML, CSS, reactstrap, react redux, react route, JSON)

## Database ##
*   MySQL

## Installation ##
*   First create a MySQL database named "posts" 
*   To connect the Django application with the MySQL database, go to the settings.py file, which is located in the directory backend_django/backend_django and in DATABASES dictionary, configurate the cretentials, host and so on.
*   Create a virtual enviroment for the django dependencies [Link official documentation](https://docs.djangoproject.com/en/3.1/intro/contributing/#getting-a-copy-of-django-s-development-version "djangoenviroment")
*   Activate the enviroment and go to the backend_django folder and install the Django dependencies with the following command using the requirements.txt file which has the dependencies
	* ### `pip install -r requirements.txt`
*   To create the tables on the database, on the backend_django folder run the following commands (python or python3 depends on your configuration when the enviroment variable on the system was set up)
	* ### `python manage.py makemigrations`
	* ### `python manage.py migrate`
*   To upload the content using Django admin, a super user has to be created, see official documentation [Link official documentation Django admin](https://docs.djangoproject.com/en/3.1/intro/tutorial02/#introducing-the-django-admin "djangoenviroment")
*   To install the react application, go to the frontend_reactjs folder and run
	* ### `yarn install`

## How to run it ##
*   Go to the backend_django folder and run
	* ### `python manage.py runserver`
*   Also go to the frontend_reactjs folder and run
	* ### `yarn start`

## Running tests ##
*   To run test for backend, go to the backend_django folder and run:
	* ### `python manage.py test posts`

## Notes ##
*   If different ports are being used, go to the settings.py file and change the port in the whitelist, or change the port in the baseUrl.js file, it depends on the configuration.
*   This application is not using https yet, it uses http, when deploying the application, I suggest using https, a private key and a public key (SSL) for exchanging data between client and server for security.

## Credits ##
*   [Tutorial django rest framework](https://bezkoder.com/django-crud-mysql-rest-framework/ "djangorestframeworktutorial")