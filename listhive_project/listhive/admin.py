from django.contrib import admin
from .models import Follower, Favorite, Like, List, ListItem, Tracker, TrackerField, TrackerItem, TrackerItemValue, Folder, ListInFolder, TrackerInFolder
from django.contrib.auth import get_user_model
User = get_user_model()

# Register your models here.
admin.site.register(User)
admin.site.register(Follower)
admin.site.register(Favorite)
admin.site.register(Like)
admin.site.register(List)
admin.site.register(ListItem)
admin.site.register(Tracker)
admin.site.register(TrackerField)
admin.site.register(TrackerItem)
admin.site.register(TrackerItemValue)
admin.site.register(Folder)
admin.site.register(ListInFolder)
admin.site.register(TrackerInFolder)
