from django.shortcuts import render
from rest_framework.viewsets import ReadOnlyModelViewSet

from . import serializers
from .models import ArticleCategory


# Create your views here.
class CategoriesViewSet(ReadOnlyModelViewSet):
    """文章分类接口视图集"""
    def get_queryset(self):
        if self.action == "list":
            return ArticleCategory.objects.filter(parent=None)
        else:
            return ArticleCategory.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.CategorySerializer
        else:
            return serializers.SubCategorySerializer
