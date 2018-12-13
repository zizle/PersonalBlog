# _*_ coding:utf-8 _*_
from django.conf.urls import url
from . import views

urlpatterns = [
    # url(r'^comments/(?P<article_id>\d+)/$', views.CommentsCountView.as_view()),
    url(r'^articles/comment/$', views.CreateCommentView.as_view()),
]
