# _*_ coding:utf-8 _*_
import xadmin
from xadmin import views
from . import models


class BaseSetting(object):
    """xadmin的基本配置"""
    enable_themes = True  # 开启主题切换功能
    use_bootswatch = True


xadmin.site.register(views.BaseAdminView, BaseSetting)


class GlobalSettings(object):
    """xadmin的全局配置"""
    site_title = "白码非码后台管理系统"  # 设置站点标题
    site_footer = "白码非码个人网站"  # 设置站点的页脚
    menu_style = "accordion"  # 设置菜单折叠


xadmin.site.register(views.CommAdminView, GlobalSettings)


xadmin.site.register(models.UserCollection)
xadmin.site.register(models.UserFan)

