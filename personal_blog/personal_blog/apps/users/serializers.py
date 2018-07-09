# _*_ coding:utf-8 _*_
from rest_framework import serializers
from django_redis import get_redis_connection
import re


from users.models import User
from .utils import generate_jwt_token


# 创建用户序列化器
class CreateUserSerializer(serializers.ModelSerializer):
    """注册创建用户的序列化器"""
    password2 = serializers.CharField(label='确认密码', write_only=True)
    allow = serializers.BooleanField(label='同意协议', write_only=True)
    image_code = serializers.CharField(min_length=4, max_length=4, label='图片验证码', write_only=True)
    image_code_id = serializers.CharField(label='图片验证码id', write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'password2', 'email', 'image_code', 'image_code_id', 'allow')

        extra_kwargs = {
            'username': {
                'min_length': 5,
                'max_length': 20,
                'error_messages': {
                    'min_length': '仅允许5-20个字符的用户名',
                    'max_length': '仅允许5-20个字符的用户名',
                    }
            },

            'password': {
                'write_only': True,
                'min_length': 6,
                'max_length': 20,
                'error_messages': {
                    'min_length': '仅允许6-20个字符的密码',
                    'max_length': '仅允许6-20个字符的密码',
                    }
                }
        }

    def validate(self, attrs):
        """检验两次密码是否一致"""
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError('两次输入的密码不一致!')
        # 验证邮箱是否正确
        if not re.match(r'^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$', attrs['email']):
            raise serializers.ValidationError('邮箱格式有误!')
        # 验证图片验证码是否正确
        # 连接redis
        redis_conn = get_redis_connection('verify')
        # 获取保存的验证码
        real_img_code = redis_conn.get('img_codes_%s' % attrs['image_code_id']).decode()
        # 对比验证码
        if attrs['image_code'].lower() != real_img_code.lower():
            raise serializers.ValidationError('图片验证码输入有误！')
        # 验证是否勾选了同意协议
        if not attrs['allow']:
            raise serializers.ValidationError('请勾选同意协议！')
        return attrs

    # 注册创建用户对象
    def create(self, validated_data):
        """创建用户"""
        # 去除不要的字段
        del validated_data['password2']
        del validated_data['allow']
        del validated_data['image_code']
        del validated_data['image_code_id']

        # 创建模型对象
        user = User.objects.create(**validated_data)
        # 设置密码
        user.set_password(validated_data['password'])
        # 保存用户
        user.save()
        # 签发签证，实现状态保持
        user = generate_jwt_token(user)
        return user

