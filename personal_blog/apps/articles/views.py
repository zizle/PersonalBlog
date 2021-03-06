from django.shortcuts import render
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.generics import ListAPIView, GenericAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response


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
    queryset = Article.objects.filter(is_top=False).order_by('-update_time')
    serializer_class = serializers.HomeArticleSerializer


class TopArticleView(APIView):
    """博主置顶接口"""
    def get(self, request):
        article = Article.objects.filter(is_top=True).first()
        serializer = serializers.HomeArticleSerializer(article)
        return Response(serializer.data)


class CreateArticle(CreateAPIView):
    """文章提交接口"""
    serializer_class = serializers.CreateArticleSerializer

    def post(self, request, *args, **kwargs):
        return Response({"data":"success!"})
