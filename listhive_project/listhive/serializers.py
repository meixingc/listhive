from rest_framework import serializers
from .models import Follower, Favorite, Like, List, ListItem, Tracker, TrackerField, TrackerItem, TrackerItemValue
from django.contrib.auth import get_user_model
User = get_user_model()

# User Serializers
class UserSerializer(serializers.HyperlinkedModelSerializer):
    lists = serializers.HyperlinkedRelatedField(
        view_name='list-detail',
        lookup_field='id',
        many=True,
        read_only=True
    )
    trackers = serializers.HyperlinkedRelatedField(
        view_name='tracker-detail',
        lookup_field='id',
        many=True,
        read_only=True
    )
    favorites = serializers.HyperlinkedRelatedField(
        view_name='favorite-detail',
        lookup_field='id',
        many=True,
        read_only=True
    )
    class Meta:
       model = User
       fields = ('id', 'photo', 'name', 'username', 'email', 'lists', 'trackers', 'favorites')

class FollowerSerializer(serializers.HyperlinkedModelSerializer):
    follower = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        read_only=True,
        lookup_field='username'
    )
    followee = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        read_only=True,
        lookup_field='username'
    )
    class Meta:
       model = Follower
       fields = ('follower', 'followee')

class FavoriteSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        lookup_field='username',
        read_only=True
    )
    content_object = serializers.SerializerMethodField()
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
    class Meta:
        model = Favorite
        fields = ('user', 'content_object')

class LikeSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        lookup_field='username',
        read_only=True
    )
    content_object = serializers.SerializerMethodField()
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
    class Meta:
        model = Like
        fields = ('user', 'content_object')


# List Serializers
class ListSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        lookup_field='username',
        read_only=True
    )
    items = serializers.HyperlinkedRelatedField(
        view_name='listitem-detail',
        lookup_field='id',
        many=True,
        read_only=True
    )

    class Meta:
        model = List
        fields = ('id', 'owner', 'user', 'name', 'description', 'public', 'items')

class ListItemSerializer(serializers.HyperlinkedModelSerializer):
    belongsTo = serializers.HyperlinkedRelatedField(
        view_name='list-detail',
        lookup_field='id',
        read_only=True
    )
    class Meta:
        model = ListItem
        fields = ('id', 'belongsTo', 'list', 'value')


# Tracker Serializers
class TrackerSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        lookup_field='username',
        read_only=True
    )
    fields = serializers.HyperlinkedRelatedField(
        view_name='trackerfield-detail',
        lookup_field='id',
        many=True,
        read_only=True
    )
    items = serializers.HyperlinkedRelatedField(
        view_name='trackeritem-detail',
        lookup_field='id',
        many=True,
        read_only=True
    )
    class Meta:
        model = Tracker
        fields = ('id', 'owner', 'user', 'name', 'description', 'public', 'fields', 'items')

class TrackerFieldSerializer(serializers.HyperlinkedModelSerializer):
    belongsTo = serializers.HyperlinkedRelatedField(
        view_name='tracker-detail',
        lookup_field='id',
        read_only=True
    )
    class Meta:
        model = TrackerField
        fields = ('id', 'belongsTo', 'tracker', 'name', 'datatype')

class TrackerItemSerializer(serializers.HyperlinkedModelSerializer):
    belongsTo = serializers.HyperlinkedRelatedField(
        view_name='tracker-detail',
        lookup_field='id',
        read_only=True
    )
    class Meta:
        model = TrackerItem
        fields = ('id', 'belongsTo', 'tracker')

class TrackerItemFieldSerializer(serializers.HyperlinkedModelSerializer):
    belongsToItem = serializers.HyperlinkedRelatedField(
        view_name='trackeritem-detail',
        lookup_field='id',
        read_only=True
    )
    belongsToField = serializers.HyperlinkedRelatedField(
        view_name='trackerfield-detail',
        lookup_field='id',
        read_only=True
    )
    class Meta:
        model = TrackerItemField
        fields = ('id', 'belongsToItem', 'belongsToField' 'item', 'field', 'value')