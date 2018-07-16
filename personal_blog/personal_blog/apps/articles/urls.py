# _*_ coding:utf-8 _*_

from rest_framework.routers import DefaultRouter
from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^articles/$', views.HomeArticlesView.as_view())
]


router = DefaultRouter()
router.register(r'categories', views.CategoriesViewSet, base_name='article_categories')

urlpatterns += router.urls

