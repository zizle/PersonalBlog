# _*_ coding:utf-8 _*_

from django.conf.urls import url
# drf—jwt提供了用户认证签发token的方法
from rest_framework_jwt.views import obtain_jwt_token

from . import views

urlpatterns = [
    url(r'^users/$', views.CreateUserView.as_view()),
    url(r'^usernames/(?P<username>\w{5,20})/count/$', views.UsernameCountView.as_view()),
    # 配置登录的url
    url(r'^authorizations/$', obtain_jwt_token)
]
