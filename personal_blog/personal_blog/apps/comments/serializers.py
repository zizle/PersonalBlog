# _*_ coding:utf-8 _*_
from rest_framework import serializers

from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    show = serializers.BooleanField(default=False, read_only=True)
    create_time = serializers.DateTimeField(format("%Y-%m-%d %H:%M:%S"), read_only=True)
    update_time = serializers.DateTimeField(format("%Y-%m-%d %H:%M:%S"), read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'create_time', 'update_time', 'content', 'user', 'article', 'parent', 'show')


class SubCommentSerializer(serializers.ModelSerializer):
    show = serializers.BooleanField(default=False, read_only=True)
    create_time = serializers.DateTimeField(format("%Y-%m-%d %H:%M:%S"), read_only=True)
    update_time = serializers.DateTimeField(format("%Y-%m-%d %H:%M:%S"), read_only=True)
    subs = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'create_time', 'update_time','content', 'user', 'article', 'parent', 'subs','show')