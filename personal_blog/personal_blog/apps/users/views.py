from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from . import serializers
from .models import User


# 检查用户名是否重复
class UsernameCountView(APIView):
    """
    用户名是否重复检测
    """
    def get(self, request, username):
        """获取当前用户名的数量"""
        count = User.objects.filter(username=username).count()
        data = {
            "username": username,
            "count": count
        }
        return Response(data=data)


# 用户注册视图
class CreateUserView(CreateAPIView):
    """用户注册"""
    # 接收参数，校验
    # 保存
    # 返回
    serializer_class = serializers.CreateUserSerializer
