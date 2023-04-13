from rest_framework import serializers
from .models import User, Follower, Favorite, Like, List, ListItem, Tracker, TrackerField, TrackerItem, TrackerItemValue, Folder, ListInFolder, TrackerInFolder

# User Serializers
class UserSerializer(serializers.ModelSerializer):
    num_followers = serializers.SerializerMethodField()
    class Meta:
       model = User
       fields = ('id', 'photo', 'first_name', 'last_name', 'username', 'email', 'num_followers')
    def get_num_followers(self, obj):
        return obj.followers.count() 
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class FollowerSerializer(serializers.HyperlinkedModelSerializer):
    follower = serializers.ReadOnlyField(source='follower.username')
    follower_url = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        read_only=True,
        lookup_field='username'
    )
    followee = serializers.ReadOnlyField(source='followee.username')
    followee_url = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        read_only=True,
        lookup_field='username'
    )
    class Meta:
       model = Follower
       fields = ('follower', 'followee', 'follower_url', 'followee_url')

class FavoriteSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        lookup_field='username',
        read_only=True
    )
    content_object = serializers.SerializerMethodField()
    class Meta:
        model = Favorite
        fields = ('user', 'content_object')
    def get_content_object(self, obj):
        if isinstance(obj.content_object, List):
            return {
                'type': 'list',
                'id': obj.content_object.id,
                'url': self.context['request'].build_absolute_uri(reverse('list-detail', args=[obj.content_object.id]))
            }
        elif isinstance(obj.content_object, Tracker):
            return {
                'type': 'tracker',
                'id': obj.content_object.id,
                'url': self.context['request'].build_absolute_uri(reverse('tracker-detail', args=[obj.content_object.id])),
                'user_id': obj.content_object.user_id
            }
        return None

class LikeSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        lookup_field='username',
        read_only=True
    )
    content_object = serializers.SerializerMethodField()
    class Meta:
        model = Like
        fields = ('user', 'content_object')
    def get_content_object(self, obj):
        if isinstance(obj.content_object, List):
            return {
                'type': 'list',
                'id': obj.content_object.id,
                'url': self.context['request'].build_absolute_uri(reverse('list-detail', args=[obj.content_object.id]))
            }
        elif isinstance(obj.content_object, Tracker):
            return {
                'type': 'tracker',
                'id': obj.content_object.id,
                'url': self.context['request'].build_absolute_uri(reverse('tracker-detail', args=[obj.content_object.id])),
                'user_id': obj.content_object.user_id
            }
        return None


# List Serializers
class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ('id', 'owner', 'name', 'description', 'public')

class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = ('id', 'list', 'value')


# Tracker Serializers
class TrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracker
        fields = ('id', 'owner', 'name', 'description', 'public')

class TrackerFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackerField
        fields = ('id', 'tracker', 'name', 'datatype')

class TrackerItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackerItem
        fields = ('id', 'tracker')

class TrackerItemValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackerItemValue
        fields = ('id', 'tracker', 'item', 'field', 'value')


# Folder Serializers
class FolderSerializer(serializers.ModelSerializer):
    lists = serializers.SerializerMethodField()
    trackers = serializers.SerializerMethodField()
    class Meta:
        model = Folder
        fields = ['id', 'user', 'name', 'public', 'lists', 'trackers']
    def get_lists(self, folder):
        lists = ListInFolder.objects.filter(folder=folder)
        return ListInFolderSerializer(lists, many=True, context=self.context).data
    def get_trackers(self, folder):
        trackers = TrackerInFolder.objects.filter(folder=folder)
        return TrackerInFolderSerializer(trackers, many=True, context=self.context).data

class ListInFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListInFolder
        fields = ['id', 'folder', 'list']

class TrackerInFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackerInFolder
        fields = ['id', 'folder', 'tracker']

