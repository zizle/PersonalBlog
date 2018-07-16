from django.db import models

from personal_blog.utils.models import BaseModel
from users.models import User

from articles.models import Article


# Create your models here.
class Comment(BaseModel):
    """文章评论自关联表"""
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, verbose_name='评论者')
    article = models.ForeignKey(Article, on_delete=models.CASCADE, verbose_name='评论的文章')
    content = models.TextField(verbose_name='评论内容')
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='subs', verbose_name='上级评论')

    class Meta:
        db_table = 'tb_article_comments'
        verbose_name = '文章评论'
        verbose_name_plural = '评论表'

    def __str__(self):
        return self.content
