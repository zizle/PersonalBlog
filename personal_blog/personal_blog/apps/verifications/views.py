from django.shortcuts import render
from rest_framework.views import APIView
from django_redis import get_redis_connection
from personal_blog.libs.captcha.captcha import captcha
from django.http import HttpResponse

from . import constants


class GenerateImageCodeView(APIView):
    """生成图片验证码"""
    def get(self, request, image_code_id):
        """
        生成图片验证码
        :param request: 请求
        :return:图片验证码
        """
        text, image = captcha.generate_captcha()
        # 将生成的验证码保存到redis
        redis_conn = get_redis_connection('verify')
        redis_conn.setex('img_codes_%s' % image_code_id, constants.IMAGE_CODES_EXPIRES, text)
        print('图片验证码:', text)
        # 返回数据
        return HttpResponse(image, content_type='image/jpg')
