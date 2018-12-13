# _*_ coding:utf-8 _*_

from rest_framework import serializers

from .models import ArticleCategory, Article


class CategorySerializer(serializers.ModelSerializer):
    """文章主类序列化器"""
    class Meta:
        model = ArticleCategory
        fields = ("id", "name")


class SubCategorySerializer(serializers.ModelSerializer):
    """文章子类序列化器"""
    subs = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = ArticleCategory
        fields = ('id', 'name', 'subs')


class HomeArticleSerializer(serializers.ModelSerializer):
    """首页文章序列化器"""
    category = serializers.StringRelatedField(label='分类')
    author = serializers.StringRelatedField(label='作者')
    update_time = serializers.DateTimeField(format("%Y-%m-%d %H:%M:%S"), read_only=True)

    class Meta:
        model = Article
        fields = ('id', 'category', 'author', 'title', 'summary', 'clicks_count', 'comments_count', 'img_url', 'update_time')


class CreateArticleSerializer(serializers.ModelSerializer):
    """创建文章序列化器"""
    pass

