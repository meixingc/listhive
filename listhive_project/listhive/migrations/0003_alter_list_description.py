# Generated by Django 4.2 on 2023-04-14 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listhive', '0002_alter_list_name_alter_tracker_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='list',
            name='description',
            field=models.CharField(max_length=100),
        ),
    ]
