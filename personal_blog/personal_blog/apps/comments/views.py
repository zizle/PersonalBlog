from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.views import Response, status

from . import serializers

# Create your views here.


class CreateCommentView(CreateAPIView):
    """评论提交视图"""
    def get_serializer_class(self):
        request_data = self.request.data
        article_id = request_data.get('article')
        comment_id = request_data.get('comment')

        if article_id and not comment_id:
            return serializers.CommentSerializer
        else:
            return serializers.SubCommentSerializer








