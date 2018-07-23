# _*_ coding:utf-8 _*_
from celery_tasks.main import celery_app

from django.template import loader
from django.conf import settings
import os

from articles.models import Article, ArticleCategory
from comments.models import Comment


@celery_app.task(name='generate_article_detail_html')
def generate_article_detail_html(article_id):
    """生成静态页面的文章详情页"""

    # 获取当前文章
    article = Article.objects.get(id=article_id)
    # 获取当前文章的一级分类名称
    parent_category = ArticleCategory.objects.filter(id=article.category.parent_id).first()
    # 渲染模板，生成静态html文件

    context = {

        'article': article,

    }

    template = loader.get_template('detail.html')
    html_text = template.render(context)
    file_path = os.path.join(settings.GENERATE_DETAIL_HTML_PATH, 'articles/' + str(article_id) + '.html')
    with open(file_path, 'w') as f:
        f.write(html_text)



