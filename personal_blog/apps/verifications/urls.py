# _*_ coding:utf-8 _*_
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^image_codes/(?P<image_code_id>[\w-]+)/$', views.GenerateImageCodeView.as_view()),
    
]
