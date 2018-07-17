# _*_ coding:utf-8 _*_

from rest_framework import serializers

from .models import ArticleCategory, Article
from users.models import User


class CategorySerializer(serializers.ModelSerializer):
    """主类序列化器"""
    class Meta:
        model = ArticleCategory
        fields = ("id", "name")


class SubCategorySerializer(serializers.ModelSerializer):
    """子类序列化器"""
    subs = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = ArticleCategory
        fields = ('id', 'name', 'subs')


class ArticleAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', "username")


class HomeArticleSerializer(serializers.ModelSerializer):
    """文章序列化器"""
    category = CategorySerializer()
    author = ArticleAuthorSerializer()

    class Meta:
        model = Article
        fields = ('id', 'category', 'author', 'title', 'summary', 'clicks_count', 'comments_count', 'update_time')
        extra_kwargs = {
            "update_time": {

            }
        }
