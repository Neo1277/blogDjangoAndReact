# Generated by Django 3.1 on 2020-11-07 21:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields
import posts.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('slug', models.SlugField(max_length=200, unique=True)),
                ('description', models.CharField(blank=True, max_length=200, null=True)),
                ('show_menu_list', models.CharField(choices=[('YES', 'Show in menu list'), ('NO', 'Not show in menu list')], default='NO', max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, unique=True)),
                ('slug', models.SlugField(max_length=200, unique=True)),
                ('description', models.CharField(max_length=200)),
                ('updated_on', models.DateTimeField(auto_now=True)),
                ('content', models.TextField()),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('status', models.IntegerField(choices=[(0, 'Draft'), (1, 'Publish')], default=0)),
                ('url_website', models.URLField(blank=True, null=True)),
                ('url_video', models.URLField(blank=True, null=True)),
                ('director', models.CharField(max_length=200)),
                ('country', django_countries.fields.CountryField(max_length=2)),
                ('image_post', models.ImageField(upload_to=posts.models.get_file_path)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL)),
                ('genres', models.ManyToManyField(to='posts.Genre')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_post_content', models.ImageField(upload_to=posts.models.get_file_path)),
                ('description', models.CharField(blank=True, max_length=200, null=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.post')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nicknane', models.CharField(max_length=50)),
                ('content', models.CharField(max_length=200)),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('answer_comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.comment')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.post')),
            ],
        ),
    ]
