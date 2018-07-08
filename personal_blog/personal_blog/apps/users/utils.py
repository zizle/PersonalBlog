# _*_ coding:utf-8 _*_
from rest_framework_jwt.settings import api_settings


# 用户模型工具类
def generate_jwt_token(user):
    """签发签证实现用户的状态保持"""
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLDER

    pay_load = jwt_payload_handler(user)
    token = jwt_encode_handler(pay_load)
    user.token = token

    return user


