from rest_framework import generics
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth import get_user_model, logout
User = get_user_model()
from .models import Follower, Favorite, Like, List, ListItem, Tracker, TrackerField, TrackerItem, TrackerItemValue, Folder, ListInFolder, TrackerInFolder
from .serializers import UserSerializer, FollowerSerializer, FavoriteSerializer, LikeSerializer, ListSerializer, ListItemSerializer, TrackerSerializer, TrackerFieldSerializer, TrackerItemSerializer, TrackerItemValueSerializer, FolderSerializer, ListInFolderSerializer, TrackerInFolderSerializer
# for generating random list/trackers from table
# import random

# Create your views here.
# REST API Views
# User Views
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class FollowerList(generics.ListCreateAPIView):
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer

class FollowerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer

class FavoriteList(generics.ListCreateAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer

class FavoriteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer

class LikeList(generics.ListCreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

class LikeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


# List Views
class ListList(generics.ListCreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer

class ListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer

class ListItemList(generics.ListCreateAPIView):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer

class ListItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer


# Tracker Views
class TrackerList(generics.ListCreateAPIView):
    queryset = Tracker.objects.all()
    serializer_class = TrackerSerializer

class TrackerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tracker.objects.all()
    serializer_class = TrackerSerializer

class TrackerFieldList(generics.ListCreateAPIView):
    queryset = TrackerField.objects.all()
    serializer_class = TrackerFieldSerializer

class TrackerFieldDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrackerField.objects.all()
    serializer_class = TrackerFieldSerializer

class TrackerItemList(generics.ListCreateAPIView):
    queryset = TrackerItem.objects.all()
    serializer_class = TrackerItemSerializer

class TrackerItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrackerItem.objects.all()
    serializer_class = TrackerItemSerializer

class TrackerItemValueList(generics.ListCreateAPIView):
    queryset = TrackerItemValue.objects.all()
    serializer_class = TrackerItemValueSerializer

class TrackerItemValueDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrackerItemValue.objects.all()
    serializer_class = TrackerItemValueSerializer


# Folder Views
class FolderList(generics.ListCreateAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

class FolderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

class ListInFolderList(generics.ListCreateAPIView):
    queryset = ListInFolder.objects.all()
    serializer_class = ListInFolderSerializer

class ListInFolderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ListInFolder.objects.all()
    serializer_class = ListInFolderSerializer

class TrackerInFolderList(generics.ListCreateAPIView):
    queryset = TrackerInFolder.objects.all()
    serializer_class = TrackerInFolderSerializer

class TrackerInFolderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrackerInFolder.objects.all()
    serializer_class = TrackerInFolderSerializer

