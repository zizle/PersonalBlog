# _*_ coding:utf-8 _*_
from celery_tasks.main import celery_app

from django.template import loader
from django.conf import settings
import os

from articles.models import Article, ArticleCategory, KeyWords
from comments.models import Comment, SubComment


@celery_app.task(name='generate_article_detail_html')
def generate_article_detail_html(article_id):
    """生成静态页面的文章详情页"""

    # 获取当前文章
    article = Article.objects.get(id=article_id)
    try:
        # 获取上一篇文章
        pre_article = Article.objects.get(id=article_id-1).title
    except Article.DoesNotExist:
        pre_article = '无'
    try:
        # 获取下一篇文章
        next_article = Article.objects.get(id=article_id + 1).title
    except Article.DoesNotExist:
        next_article = '无'

    # 获取当前文章的一级分类名称
    parent_category = ArticleCategory.objects.filter(id=article.category.parent_id).first()

    # 获取当前文章的关键字
    key_words = KeyWords.objects.filter(article=article_id)

    # 获取当前文章的主评论
    comments = Comment.objects.order_by('-create_time').filter(article=article_id, is_pass=True)
    # 主评论数
    comments_count = comments.count()

    # 获取当前主评论的子评论
    leader_comments = []
    for comment in comments:
        sub_comments = SubComment.objects.order_by('-create_time').filter(comment=comment.id, is_pass=True)
        comment.subs = sub_comments
        leader_comments.append(comment)

    # 渲染模板，生成静态html文件

    context = {

        'article': article,
        'key_words': key_words,
        'pre_article': pre_article,
        'next_article': next_article,
        'parent_category': parent_category,
        'comments': comments,
        'comments_count': comments_count,

    }

    template = loader.get_template('detail.html')
    html_text = template.render(context)
    file_path = os.path.join(settings.GENERATE_DETAIL_HTML_PATH, 'articles/' + str(article_id) + '.html')
    with open(file_path, 'w') as f:
        f.write(html_text)



