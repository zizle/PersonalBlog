# _*_ coding:utf-8 _*_

from rest_framework.routers import DefaultRouter

from . import views


urlpatterns = []


router = DefaultRouter()
router.register(r'categories', views.CategoriesViewSet, base_name='article_categories')

urlpatterns += router.urls

