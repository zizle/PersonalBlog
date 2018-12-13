# _*_ coding:utf-8 _*_
import xadmin

from . import models


class CommentAdmin(object):
    model_icon = ''


xadmin.site.register(models.Comment, CommentAdmin)
xadmin.site.register(models.SubComment)
