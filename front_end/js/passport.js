window.onload = function () {


    var vm = new Vue({
        el: '#app',
        data: {
            host,
			show_message:false,
            login_show: true,
            register_show: false,
            image_code_id: '',
            image_code_url: '',

			username: '',
			password: '',
			password2: '',
			image_code: '',
			allow: '',

        },
        mounted: function () {
        	this.generate_image_url();

        },
        methods: {
        	// 显示注册框
            show_reg: function () {
                this.login_show = false;
                this.register_show = true;
            },
			// 显示登录框
			show_log: function () {
				this.login_show = true;
				this.register_show = false;
            },
			// 生成图片验证码的uuid
			generate_uuid: function () {
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
			// 生成图片验证码的url
			generate_image_url: function () {
				this.image_code_id = this.generate_uuid();
				this.image_code_url = this.host + '/image_codes/' + this.image_code_id + '/';
            },
			// 用户注册
			register_user: function () {
				axios.post(this.host + '/users/', {
					username:'',
					password:'',
					password2: '',
					image_code: '',
					image_code_id: '',
					allow: this.allow.toString()
				},{
					responseType: 'json',
				})
					.then(response => {

					})
					.catch(error => {

					})
            },
			
        }
    })

}
// //服务器校验
// 	function severCheck(){
// 		if(check()){
// 			var loginname = $("#loginname").val();
// 			var password = $("#password").val();
// 			var code = loginname+","+password+","+$("#code").val();
// 			$.ajax({
// 				type: "POST",
// 				url: '',
// 				data: {
// 					KEYDATA:code,tm:new Date().getTime()
// 				},
// 				dataType:'json',
// 				cache: false,
// 				success: function(data){
// 					if("success" == data.result){
// 						saveCookie();
// 						window.location.href="<%=basePath%>main/index";
// 					}else if("usererror" == data.result){
// 						$("#loginname").tips({
// 							side : 1,
// 							msg : "用户名或密码有误",
// 							bg : '#FF5080',
// 							time : 15
// 						});
// 						showfh();
// 						$("#loginname").focus();
// 					}else if("codeerror" == data.result){
// 						$("#code").tips({
// 							side : 1,
// 							msg : "验证码输入有误",
// 							bg : '#FF5080',
// 							time : 15
// 						});
// 						showfh();
// 						$("#code").focus();
// 					}else{
// 						$("#loginname").tips({
// 							side : 1,
// 							msg : "缺少参数",
// 							bg : '#FF5080',
// 							time : 15
// 						});
// 						showfh();
// 						$("#loginname").focus();
// 					}
// 				}
// 			});
// 		}
// 	}
// 	// 点击更换验证码
// 	$(document).ready(function() {
// 		changeCode1();
// 		$("#codeImg").bind("click", changeCode1);
// 		$("#zcodeImg").bind("click", changeCode2);
// 	});
//
// 	// 键盘按下事件
// 	$(document).keyup(function(event) {
// 		// 按下enter键触发#to-recover的点击功能
// 		if (event.keyCode == 13) {
// 			$("#to-recover").trigger("click");
// 		}
// 	});
//
// 	// 利用时间戳作为图片验证码的id
// 	// function genTimestamp() {
// 	// 	var time = new Date();
// 	// 	return time.getTime();
// 	// }
//
// 	// 生成图片验证码的uuid
// 	function generate_uuid(){
//             var d = new Date().getTime();
//             if(window.performance && typeof window.performance.now === "function"){
//                 d += performance.now(); //use high-precision timer if available
//             }
//             var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//                 var r = (d + Math.random()*16)%16 | 0;
//                 d = Math.floor(d/16);
//                 return (c =='x' ? r : (r&0x3|0x8)).toString(16);
//             });
//             return uuid;
//         }
//
// 	// 访问后端api生成登录图片验证码
// 	function changeCode1() {
// 		var image_code_id = generate_uuid();
//
// 		$("#codeImg").attr("src", "http://127.0.0.1:8000/image_codes/" + image_code_id + '/');
// 	}
// 	// 访问后端api生成注册图片验证码
// 	function changeCode2() {
// 		var image_code_id = generate_uuid();
// 		$("#image_code_id").val(image_code_id);
// 		// $("#zcodeImg").attr("src", "code.do?t=" + generate_uuid());
// 		$("#zcodeImg").attr("src", "http://127.0.0.1:8000/image_codes/" + image_code_id + '/');
// 	}
//
// 	//客户端校验
// 	function check() {
// 		if ($("#loginname").val() == "") {
// 			$("#loginname").tips({
// 				side : 2,
// 				msg : '用户名不得为空',
// 				bg : '#AE81FF',
// 				time : 3
// 			});
// 			showfh();
// 			$("#loginname").focus();
// 			return false;
// 		} else {
// 			$("#loginname").val(jQuery.trim($('#loginname').val()));
// 		}
// 		if ($("#password").val() == "") {
// 			$("#password").tips({
// 				side : 2,
// 				msg : '密码不得为空',
// 				bg : '#AE81FF',
// 				time : 3
// 			});
// 			showfh();
// 			$("#password").focus();
// 			return false;
// 		}
// 		if ($("#code").val() == "") {
// 			$("#code").tips({
// 				side : 1,
// 				msg : '验证码不得为空',
// 				bg : '#AE81FF',
// 				time : 3
// 			});
// 			showfh();
// 			$("#code").focus();
// 			return false;
// 		}
// 		$("#loginbox").tips({
// 			side : 1,
// 			msg : '正在登录 , 请稍后 ...',
// 			bg : '#68B500',
// 			time : 10
// 		});
//
// 		return true;
// 	}
//
// 	// cookie记住密码，同意协议
// 	function savePaw() {
// 		if (!$("#saveid").attr("checked")) {
// 			$.cookie('loginname', '', {
// 				expires : -1
// 			});
// 			$.cookie('password', '', {
// 				expires : -1
// 			});
// 			$("#loginname").val('');
// 			$("#password").val('');
// 		}
// 	}
//
// 	// 保存登录状态
// 	function saveCookie() {
// 		if ($("#saveid").attr("checked")) {
// 			$.cookie('loginname', $("#loginname").val(), {
// 				expires : 7
// 			});
// 			$.cookie('password', $("#password").val(), {
// 				expires : 7
// 			});
// 		}
// 	}
//
// 	// 文档加载完成，如果是记住密码状态，直接填好用户名密码
// 	jQuery(function() {
// 		var loginname = $.cookie('loginname');
// 		var password = $.cookie('password');
// 		if (typeof(loginname) != "undefined"
// 				&& typeof(password) != "undefined") {
// 			$("#loginname").val(loginname);
// 			$("#password").val(password);
// 			$("#saveid").attr("checked", true);
// 			// 聚焦在密码输入框
// 			$("#code").focus();
// 		}
// 	});
//
// 	//登录注册页面切换
// 	function changepage(value) {
// 		if(value == 1){
// 			$("#windows1").hide();
// 			$("#windows2").show();
// 			changeCode2();
// 		}else{
// 			$("#windows2").hide();
// 			$("#windows1").show();
// 			changeCode1();
// 		}
// 	}
//
// //注册
// function rcheck(){
// 	if($("#USERNAME").val()=="" && $("#SUERNAME").val().length < 5){
// 		$("#USERNAME").tips({
// 			side:3,
// 			msg:'输入用户名',
// 			bg:'#AE81FF',
// 			time:2
// 		});
// 		$("#USERNAME").focus();
// 		$("#USERNAME").val('');
// 		return false;
// 	}else{
// 		$("#USERNAME").val(jQuery.trim($('#USERNAME').val()));
// 	}
// 	if($("#PASSWORD").val()==""){
// 		$("#PASSWORD").tips({
// 			side:3,
// 			msg:'输入密码',
// 			bg:'#AE81FF',
// 			time:2
// 		});
// 		$("#PASSWORD").focus();
// 		return false;
// 	}
// 	if($("#PASSWORD").val()!=$("#chkpwd").val()){
// 		$("#chkpwd").tips({
// 			side:3,
// 			msg:'两次密码不相同',
// 			bg:'#AE81FF',
// 			time:3
// 		});
// 		$("#chkpwd").focus();
// 		return false;
// 	}
// 	if($("#name").val()==""){
// 		$("#name").tips({
// 			side:3,
// 			msg:'输入姓名',
// 			bg:'#AE81FF',
// 			time:3
// 		});
// 		$("#name").focus();
// 		return false;
// 	}
// 	if($("#EMAIL").val()==""){
// 		$("#EMAIL").tips({
// 			side:3,
// 			msg:'输入邮箱',
// 			bg:'#AE81FF',
// 			time:3
// 		});
// 		$("#EMAIL").focus();
// 		return false;
// 	}else if(!ismail($("#EMAIL").val())){
// 		$("#EMAIL").tips({
// 			side:3,
// 			msg:'邮箱格式不正确',
// 			bg:'#AE81FF',
// 			time:3
// 		});
// 		$("#EMAIL").focus();
// 		return false;
// 	}
// 	if ($("#rcode").val() == "") {
// 		$("#rcode").tips({
// 			side : 1,
// 			msg : '验证码不得为空',
// 			bg : '#AE81FF',
// 			time : 3
// 		});
// 		$("#rcode").focus();
// 		return false;
// 	}
// 	return true;
// }
//
// //提交注册
// function register(){
// 	if(rcheck()){
// 		// var nowtime = date2str(new Date(),"yyyyMMdd");
// 		$.ajax({
// 			type: "POST",
// 			url: '127.0.0.1:8000/users/',
// 			// data: {USERNAME:$("#USERNAME").val(),PASSWORD:$("#PASSWORD").val(),NAME:$("#name").val(),EMAIL:$("#EMAIL").val(),rcode:$("#rcode").val(),FKEY:$.md5('USERNAME'+nowtime+',fh,'),tm:new Date().getTime()},
// 			data: {
// 				'username': $("#USERNAME").val(),
// 				'password': $("#PASSWORD").val(),
// 				'password2': $("#chkpws").val(),
// 				'email': $("#EMAIL").val(),
// 				'image_code': $("#rcode").val(),
// 				'image_code_id': $("#image_code_id").val(),
// 				'allow': $("#saveid").val(),
// 			},
// 			dataType:'json',
// 			cache: false,
// 			success: function(data){
// 				if("00" == data.result){
// 					$("#windows2").hide();
// 					$("#windows1").show();
// 					$("#loginbox").tips({
// 						side : 1,
// 						msg : '注册成功,请登录',
// 						bg : '#68B500',
// 						time : 3
// 					});
// 					changeCode1();
// 				}else if("04" == data.result){
// 					$("#USERNAME").tips({
// 						side : 1,
// 						msg : "用户名已存在",
// 						bg : '#FF5080',
// 						time : 15
// 					});
// 					showfh();
// 					$("#USERNAME").focus();
// 				}else if("06" == data.result){
// 					$("#rcode").tips({
// 						side : 1,
// 						msg : "验证码输入有误",
// 						bg : '#FF5080',
// 						time : 15
// 					});
// 					showfh();
// 					$("#rcode").focus();
// 				}
// 			}
// 		});
// 	}
// }
//
// //邮箱格式校验
// function ismail(mail){
// 	return(new RegExp(/^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/).test(mail));
// }
// //js  日期格式
