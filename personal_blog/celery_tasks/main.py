# _*_ coding:utf-8 _*_
# 运行任务方式：在personal_blog目录下执行celery -A celery_tasks.main worker -l info
from celery import Celery
# 让celery使用django的配置文件
import os
if not os.getenv('DJANGO_SETTINGS_MODULE'):
    os.environ['DJANGO_SETTINGS_MODULE'] = 'personal_blog.settings.dev'

celery_app = Celery('blog')
celery_app.config_from_object('celery_tasks.config')

# 导入任务
celery_app.autodiscover_tasks(['celery_tasks.html'])
