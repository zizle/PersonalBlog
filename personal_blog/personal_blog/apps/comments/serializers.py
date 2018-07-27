# _*_ coding:utf-8 _*_
from rest_framework import serializers

from .models import Comment, SubComment


class CommentSerializer(serializers.ModelSerializer):
    # show = serializers.BooleanField(default=False, read_only=True)
    create_time = serializers.DateTimeField(format("%Y-%m-%d %H:%M:%S"), read_only=True)
    update_time = serializers.DateTimeField(format("%Y-%m-%d %H:%M:%S"), read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'create_time', 'update_time', 'content', 'user', 'article')


class SubCommentSerializer(serializers.ModelSerializer):
    # show = serializers.BooleanField(default=False, read_only=True)
    create_time = serializers.DateTimeField(format("%Y-%m-%d %H:%M:%S"), read_only=True)
    update_time = serializers.DateTimeField(format("%Y-%m-%d %H:%M:%S"), read_only=True)
    subs = CommentSerializer(many=True, read_only=True)


    class Meta:
        model = SubComment
        fields = ('id', 'create_time', 'update_time', 'comment', 'content', 'user', 'parent', 'subs')

    def validated_comment(self, value):
        """检验comment是否存在"""
        try:
            comment = Comment.objects.get(id=value)
        except Comment.DoesNotExist:
            raise serializers.ValidationError('该主评论不存在！')
        return value


