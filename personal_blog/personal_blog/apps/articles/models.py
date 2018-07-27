from django.db import models
from personal_blog.utils.models import BaseModel

from users.models import User


class ArticleCategory(models.Model):
    """文章分类自关联表"""
    name = models.CharField(max_length=20, verbose_name='名称')
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, related_name='subs', null=True, blank=True, verbose_name='上级分类')

    class Meta:
        db_table = 'tb_categories'
        verbose_name = '文章分类'
        verbose_name_plural = '分类表'

    def __str__(self):
        return self.name


class Article(BaseModel):
    """文章表"""
    category = models.ForeignKey(ArticleCategory, on_delete=models.PROTECT, verbose_name='分类')
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, verbose_name='作者')
    title = models.CharField(max_length=100, blank=False, verbose_name='标题')
    summary = models.CharField(null=True, blank=True, max_length=256, verbose_name='摘要')
    content = models.TextField(blank=False, verbose_name='文章内容')
    clicks_count = models.IntegerField(default=0, verbose_name='点击量')
    comments_count = models.IntegerField(default=0, verbose_name='评论量')
    img_url = models.CharField(max_length=200, default='', null=True, blank=True, verbose_name='图片地址')
    title_image = models.ImageField(null=True, blank=True, verbose_name='标题图片')
    is_top = models.BooleanField(default=False, verbose_name='置顶')

    class Meta:
        db_table = 'tb_articles'
        verbose_name = '文章'
        verbose_name_plural = '文章'

    def __str__(self):
        return self.title


class KeyWords(BaseModel):
    """文章关键字表"""
    article = models.ForeignKey(Article, on_delete=models.CASCADE, verbose_name='文章id')
    word = models.CharField(max_length=10, verbose_name='关键字')

    class Meta:
        db_table = 'tb_words'
        verbose_name = '关键字'
        verbose_name_plural = '关键字表'

    def __str__(self):
        return self.word
