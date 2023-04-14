import jwt, datetime
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, redirect, get_object_or_404
from django.core.exceptions import PermissionDenied
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth import get_user_model, logout
User = get_user_model()
from .models import Follower, Favorite, Like, List, ListItem, Tracker, TrackerField, TrackerItem, TrackerItemValue, Folder, ListInFolder, TrackerInFolder
from .serializers import UserSerializer, FollowerSerializer, FavoriteSerializer, LikeSerializer, ListSerializer, ListItemSerializer, TrackerSerializer, TrackerFieldSerializer, TrackerItemSerializer, TrackerItemValueSerializer, FolderSerializer, ListInFolderSerializer, TrackerInFolderSerializer

# User Views
class RegisterView(APIView):
    def post(self, req):
        serializer = UserSerializer(data=req.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        user = User.objects.filter(username=username).first()
        if user is None:
            raise AuthenticationFailed("User not found")
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        return Response({'jwt': token, 'user': user.id}, status=200)

class LogoutView(APIView):
    def post(self, request):
        return Response({'message': 'Logged Out'}, status=200)

class UserView(APIView):
    def get_object(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404   
    def get(self, request): 
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            raise AuthenticationFailed('Authentication header missing')
        try:
            token = auth_header.split(' ')[1]
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')
        except IndexError:
            raise AuthenticationFailed('Token prefix missing')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')
        user = User.objects.filter(id=payload['id']).first()
        if user is None:
            raise AuthenticationFailed('User not found')
        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)

class UserUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request, user_id):
        print('User ID:')
        user = User.objects.filter(id=user_id).first()
        if user is None:
            raise Http404
        auth_header = request.headers.get('Authorization')
        print('Authentication Header:')
        if not auth_header:
            raise AuthenticationFailed('Authentication header missing')
        try:
            token = auth_header.split(' ')[1]
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')
        except IndexError:
            raise AuthenticationFailed('Token prefix missing')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')
        authenticated_user = User.objects.filter(id=payload['id']).first()
        if authenticated_user is None:
            raise AuthenticationFailed('User not found')
        if authenticated_user.id != user.id:
            raise PermissionDenied('You do not have permission to update this user')
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)

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
class ListCreateView(APIView):
    def post(self, request):
        serializer = ListSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        list_object = serializer.save()
        return Response(ListSerializer(list_object).data, status=status.HTTP_201_CREATED)

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
class TrackerCreateView(APIView):
    def post(self, request):
        serializer = TrackerSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        tracker_object = serializer.save()
        return Response(TrackerSerializer(tracker_object).data, status=status.HTTP_201_CREATED)

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