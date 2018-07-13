from django.db import models


class ArticleCategory(models.Model):
    """文章分类自关联表"""
    name = models.CharField(max_length=20, verbose_name='名称')
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, related_name='subs', null=True, blank=True, verbose_name='上级分类')

    class Meta:
        db_table = 'tb_article_categories'
        verbose_name = '文章分类'
        verbose_name_plural = '文章分类'

    def __str__(self):
        return self.name

