function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}
var host = 'http://127.0.0.1:8000';


$(function(){
    // 获取当前用户是否为登录状态
    var user_id = getCookie('user_id');
    if (user_id) {
        $('.comment_form').show();
        $('.comment_form_logout').hide();
        // 用户登录了，发送ajax请求查看当前文章是否被收藏
        $.ajax({
            url: host + '/collections/'+ user_id + '/?article=' + $('.comment_form').attr('data-articleid'),
            type:'get',
            contentType:'application/json',
        })
            .done(function (response) {
                if (response.colleted){
                    // 显示已收藏
                    $('.collected').show();
                    $('.collection').hide();
                }else{
                    $('.collected').hide();
                    $('.collection').show();
                }
            })
            .fail(function () {
                $('.collected').hide();
                $('.collection').show();
                alert('服务器超时，请重刷新！')
            })
    }else{
        $('.comment_form').hide();
        $('.comment_form_logout').show();
        // 用户未登录，显示收藏标签
        $('.collected').hide();
        $('.collection').show();

    }



    // 打开登录框
    $('.comment_form_logout').click(function () {
        // $('.login_form_con').show();
        // TODO 跳转登录页面
        alert('请登录')
    })

    // 收藏
    $(".collection").click(function () {
        alert('收藏')

    })

    // 取消收藏
    $(".collected").click(function () {
        alert('取消收藏')

    });
    // 添加回复输入表单



    // 评论提交，阻止form表单自动提交
    $(".comment_form, .reply_form, .sub_reply_form").submit(function (e) {
        e.preventDefault();

    });
    // 主评论提交
    $(".comment_form").submit(function (e) {
        e.preventDefault();
        var params = {
            'content': $('.comment_input').val(),
            'article': parseInt($(this).attr('data-articleid')),
            // 'user': parseInt(localStorage.user_id),
            'user': parseInt(getCookie('user_id')),

        };
        $.ajax({
            url: host + '/articles/comment/',
            type:'post',
            data:JSON.stringify(params),
            contentType:'application/json',
        })
            .done(function (response) {
                 // 输入框失去焦点
                $('.reply_sub').blur();
                // 清空输入框内容
                $('.reply_input').val('');
                $('.sub_reply_input').val('');
                alert('评论成功!');
            })
            .fail(function () {
                alert('服务器超时，请重试！')
            })
    })

    $('.comment_list_con').delegate('a,input','click',function(){

        var sHandler = $(this).prop('class');

        if(sHandler.indexOf('comment_reply')>=0)
        {
            $(this).next().toggle();
        }

        if(sHandler.indexOf('reply_cancel')>=0)
        {
            $(this).parent().parent().toggle();
        }

        if(sHandler.indexOf('comment_up')>=0)
        {
            var $this = $(this);
            if(sHandler.indexOf('has_comment_up')>=0)
            {
                // 如果当前该评论已经是点赞状态，再次点击会进行到此代码块内，代表要取消点赞
                $this.removeClass('has_comment_up')
                alert('取消点赞')
            }else {
                $this.addClass('has_comment_up')
                alert('点赞')
            }
        }

        if(sHandler.indexOf('reply_sub')>=0)
        {
            // 回复评论，回复子评论
            var $this = $(this);
            var params = {
                'content': $this.parent().prev().val(),
                'article': parseInt($(this).parent().attr('data-articleid')),
                // 'user': parseInt(localStorage.user_id),
                'user':parseInt(getCookie('user_id')),
                'comment': parseInt($(this).parent().attr('data-commentid')),
                'parent': parseInt($(this).parent().attr('data-parent'))
            };
            $.ajax({
                url: host + '/articles/comment/',
                type:'post',
                data:JSON.stringify(params),
                contentType:'application/json',
            })
            .done(function (response) {
                 // 输入框失去焦点
                $('.comment_sub').blur();
                // 清空输入框内容
                $('.comment_input').val('');
                alert('评论成功!');
            })
            .fail(function () {
                alert('服务器超时，请重试！')
            })

        }
    })

        // 关注当前新闻作者
    $(".focus").click(function () {

    })

    // 取消关注当前新闻作者
    $(".focused").click(function () {

    })
})