from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView, Response

from .models import Comment
import json


class CommentsCountView(APIView):
    """当前文章的评论条数"""
    def get(self, request, article_id):
        count = Comment.objects.filter(article=article_id).count()
        return Response({"count": count})

