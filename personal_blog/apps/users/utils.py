# _*_ coding:utf-8 _*_
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.backends import ModelBackend
import re
from .models import User


# 自定义登录成功返回的数据
def jwt_response_payload_handler(token, user=None, request=None):
    return {
        "token": token,
        "user_id": user.id,
        "username": user.username
    }


# 定义多账号登录的方法
def get_user_by_account(account):
    """
   根据帐号获取user对象
   :param account: 账号，可以是用户名，也可以是手机号
   :return: User对象 或者 None
   """
    try:
        if re.match('^1[3-9]\d{9}$', account):
            # 帐号为手机号
            user = User.objects.get(mobile=account)
        elif re.match(r'^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$', account):
            # 账号为邮箱
            user = User.objects.get(email=account)
        else:
            # 帐号为用户名
            user = User.objects.get(username=account)
    except User.DoesNotExist:
        return None
    else:
        return user


class MoreAccountLogin(ModelBackend):
    """多账号登录"""
    def authenticate(self, request, username=None, password=None, **kwargs):
        user = get_user_by_account(username)
        if user is not None and user.check_password(password):
            return user


# 用户模型工具
def generate_jwt_token(user):
    """签发签证实现用户的状态保持"""
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    pay_load = jwt_payload_handler(user)
    token = jwt_encode_handler(pay_load)
    user.token = token

    return user


