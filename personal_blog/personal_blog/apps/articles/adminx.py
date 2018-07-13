import xadmin

from . import models


class ArticleCategoryAdmin(object):
    model_icon = 'fa fa-gift'


xadmin.site.register(models.ArticleCategory, ArticleCategoryAdmin)
