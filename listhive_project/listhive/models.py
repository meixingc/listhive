from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

# User Models
class User(AbstractUser):
    photo = models.TextField(default='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
    def get_followers(self):
        return self.followers.all()
    def get_following(self):
        return self.following.all()

class Follower(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    followee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    class Meta:
        unique_together = ('follower', 'followee')
    def __str__(self):
        return self.followee

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    class Meta:
        unique_together = ('user', 'content_type', 'object_id')
    def __str__(self):
        return self.user

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    class Meta:
        unique_together = ('user', 'content_type', 'object_id')
    def __str__(self):
        return self.content_object


# List Models
class List(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.CharField()
    public = models.BooleanField(default=False)
    def __str__(self):
        return self.name

class ListItem(models.Model):
    list = models.ForeignKey(List, on_delete=models.CASCADE)
    value = models.CharField()
    def __str__(self):
        return self.list


# Tracker Models
class Tracker(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    public = models.BooleanField(default=False)
    def __str__(self):
        return self.name

class TrackerField(models.Model):
    tracker = models.ForeignKey(Tracker, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    datatype = models.CharField(max_length=30)
    def __str__(self):
        return self.tracker

class TrackerItem(models.Model):
    tracker = models.ForeignKey(Tracker, on_delete=models.CASCADE)
    def __str__(self):
        return self.tracker

class TrackerItemValue(models.Model):
    tracker = models.ForeignKey(Tracker, on_delete=models.CASCADE)
    field = models.ForeignKey(TrackerField, on_delete=models.CASCADE)
    item = models.ForeignKey(TrackerItem, on_delete=models.CASCADE)
    value = models.CharField()
    def __str__(self):
        return self.item


# Folder Models
class Folder(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='folders')
    name = models.CharField(max_length=50)
    public = models.BooleanField(default=False)
    def __str__(self):
        return self.name

class ListInFolder(models.Model):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name='lists')
    list = models.ForeignKey(List, on_delete=models.CASCADE)
    def __str__(self):
        return self.folder

class TrackerInFolder(models.Model):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name='trackers')
    tracker = models.ForeignKey(Tracker, on_delete=models.CASCADE)
    def __str__(self):
        return self.folder