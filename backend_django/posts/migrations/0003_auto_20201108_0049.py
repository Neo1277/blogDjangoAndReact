# Generated by Django 3.1 on 2020-11-08 00:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20201107_2343'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='imageps', to='posts.post'),
        ),
    ]
