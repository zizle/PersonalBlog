// Vue
window.onload = function () {
    var vm = new Vue({
	el: '#app',
	data: {
	    host,
        image_code_id: '',
        image_code_url: '',

    },
    mounted: function(){
        this.generate_image_code();
    },
    methods:{
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
        generate_image_code: function () {
            // 生成一个uuid
            this.image_code_id = this.generate_uuid();
            // 设置页面中图片验证码img标签的src属性
            this.image_code_url = this.host + "/image_codes/" + this.image_code_id + "/";
        },
    }

})
}
