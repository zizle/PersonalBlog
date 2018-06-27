
window.onload = function () {

    var vm = new Vue({
        el: '#app',
        data: {
            host,
            image_code_url: '',  // 图片验证码路径
            image_code_id : '',  // 图片验证码的uuid
            register_con: false, // 是否显示登录框
            is_cover: false,  // 是否变暗背景
        },
        mounted: function () {
            this.generate_image_code()
        },
        methods: {
        // 生成uuid
        generate_uuid: function(){
            var d = new Date().getTime();
            if(window.performance && typeof window.performance.now === "function"){
                d += performance.now(); //use high-precision timer if available
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c =='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        },
        // 请求图片验证码，修改图片验证码的的url
        generate_image_code: function () {
            this.image_code_id = this.generate_uuid();
            // 设置image标签的src属性，让浏览器自己发送
            this.image_code_url = this.host + '/image_codes/' + this.image_code_id + '/';
        },
        // 注册窗口显示
        register_account: function () {
            this.register_con = true;
            this.is_cover = true
        },
        // 关闭注册窗口
        exit_register: function () {
            this.register_con = false;
            this.is_cover = false
        },


        }
    })
}