import xadmin

from . import models


# class ArticleCategoryAdmin(object):
#     model_icon = 'fa fa-gift'
class ArticleXAdmin(object):
    def save_models(self):
        obj = self.new_obj
        obj.save()

        # 补充自定义行为
        from celery_tasks.html.tasks import generate_article_detail_html
        generate_article_detail_html.delay(obj.id)

    def delete_model(self):
        # 删除数据对象
        obj = self.obj
        article_id = obj.id
        obj.delete()

        # # 补充自定义行为
        from celery_tasks.html.tasks import generate_article_detail_html
        generate_article_detail_html.delay(article_id)


xadmin.site.register(models.ArticleCategory)
xadmin.site.register(models.Article, ArticleXAdmin)


