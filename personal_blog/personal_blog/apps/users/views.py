from django.shortcuts import render
from rest_framework.generics import CreateAPIView

from . import serializers


# 用户注册视图
class CreateUserView(CreateAPIView):
    """用户注册"""
    # 接收参数，校验
    # 保存
    # 返回
    serializer_class = serializers.CreateUserSerializer
