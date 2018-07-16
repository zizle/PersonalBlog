from django.shortcuts import render
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.generics import ListAPIView

from . import serializers
from .models import ArticleCategory, Article


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


class HomeArticlesView(ListAPIView):
    """首页文章接口视图"""
    queryset = Article.objects.all().order_by('update_time')
    serializer_class = serializers.HomeArticleSerializer

