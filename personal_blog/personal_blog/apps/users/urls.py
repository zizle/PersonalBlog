# _*_ coding:utf-8 _*_

from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^users/$', views.CreateUserView.as_view()),
]
