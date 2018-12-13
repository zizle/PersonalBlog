from django.db import models
from django.contrib.auth.models import AbstractUser

from utils.models import BaseModel

# Create your models here.

class User(AbstractUser):
    """用户模型类"""
    # 添加原来没有的字段
    mobile = models.CharField(max_length=11, unique=True, null=True, verbose_name='手机号')

    class Meta:
        db_table = 'tb_users'
        verbose_name = '用户'
        verbose_name_plural = verbose_name


from articles.models import Article


class UserCollection(BaseModel):
    """用户收藏表"""
    user = models.ForeignKey(User, verbose_name='用户')
    article = models.ForeignKey(Article, verbose_name='文章')

    class Meta:
        db_table = 'tb_collections'
        verbose_name = '收藏'
        verbose_name_plural = '收藏表'


class UserFan(BaseModel):
    """用户关注表"""
    user = models.ForeignKey(User, verbose_name='用户')
    followed_id = models.IntegerField(verbose_name='被关注')
    follower_id = models.IntegerField(verbose_name='关注了')

    class Meta:
        db_table = 'tb_follows'
        verbose_name = '用户关注'
        verbose_name_plural = '用户关注表'

