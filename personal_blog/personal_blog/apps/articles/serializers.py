# _*_ coding:utf-8 _*_

from rest_framework import serializers

from .models import ArticleCategory


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