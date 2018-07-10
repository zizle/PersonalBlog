window.onload = function () {
    var vm = new Vue({
        el: '#app',
        data: {
            host,
			// 显示错误信息
			show_login_username_error: false,
			show_login_password_error: false,
			show_login_image_code_error: false,

			show_error_username:false,
			show_error_password: false,
			show_error_passeword2: false,
			show_error_email: false,
			show_error_allow: false,
			show_error_image_code: false,

			// 错误信息内容
			login_username_error_message: '',
			login_password_error_message: '',
			login_image_code_error_message: '',

			username_error_message: '',
			password_error_message: '',
			password2_error_message: '',
			email_error_message: '',
			image_code_error_message: '',

			// 显示哪个窗口
            login_show: true,
			register_show: false,

			// 显示对勾
			login_username_right: false,
			login_password_right: false,
			username_right: false,
			password_right: false,
			password2_right: false,
			email_right: false,

			// 验证结果保存
			error_username: false,
			error_password: false,
			error_email: false,
			error_image_code: false,

			// 绑定登录数据
			login_username: '',
			login_password: '',
			login_image_code: '',

			// 绑定注册数据
			image_code_id: '',
            image_code_url: '',
			username: '',
			password: '',
			password2: '',
			image_code: '',
			email: '',
			allow: true,

        },
        mounted: function () {
        	this.generate_image_url();

        },
        methods: {
        	// 显示注册框
            show_reg: function () {
            	this.show_message = false;
                this.login_show = false;
                this.register_show = true;
            },
			// 显示登录框
			show_log: function () {
            	this.show_message = false;
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
			login_username_focus: function () {
            	this.login_username_right = false;
            	this.show_login_username_error = false;

            },
			// 登录检验
			check_login_username: function () {
            	var len = this.login_username.length;
            	if (len<5 || len>20){
            		this.login_username_error_message = '用户名为5-20个字符 ！';
            		this.show_login_username_error = true;
				}else if(!/^[0-9a-zA-Z_]+$/.test(this.login_username)){
            		this.login_username_error_message = '用户名输入有误!'
				} else{
            		this.login_username_focus();
            		this.login_username_right = true;
				}
            },
			login_password_focus: function () {
				this.show_login_password_error = false;
				this.login_password_right = false;
            },
			check_login_password: function () {
            	var len = this.login_password.length;
            	if (len<6 || len>20){
            		this.login_password_error_message = '请输入6-20位的密码 ！';
					this.show_login_password_error = true;
				}else{
            		this.login_password_focus();
            		this.login_password_right = true;
				}
            },
			login_image_code_focus: function () {
				this.show_login_image_code_error = false;
            },
			check_login_image_code: function () {
				if (!this.login_image_code){
					this.login_image_code_error_message = '请填写验证码!';
					this.show_login_image_code_error = true;
				}else{
					this.login_image_code_focus();
				}
            },
			// 注册检验
			username_focus: function () {
				this.show_error_username = false;
				this.username_right = false;
            },
			check_username: function () {
				var len = this.username.length;
				if (len<5 || len>20){
					this.username_error_message = '请输入5-20个字符的用户名 !';
					this.show_error_username = true;

				}else if (!/^[0-9a-zA-Z_]+$/.test(this.username)){
					this.username_error_message = '用户名只能含数字、字母、下滑线 !';
					this.show_error_username = true;

				}else{
					this.username_focus();
					this.username_right = true;
				}
            },
			password_focus: function () {
				this.show_error_password = false;
				this.password_right = false;
            },
			check_password: function () {
            	var len = this.password.length
				if (len<6 || len>20){
            		this.password_error_message = '请输入6-20位的密码 ！';
					this.show_error_password = true;
				}else{
            		this.password_focus();
            		this.password_right = true;
				}
            },
			password2_focus: function () {
				this.show_error_password2 = false;
				this.password2_right = false;
            },
			check_password2: function () {
				var len = this.password2.length;
				if (len<6 || len>20){
					this.password2_error_message = '请输入6-20位的密码 ！';
					this.show_error_password2 = true
				}else if (this.password2 != this.password){
					this.password2_error_message = '两次输入的密码不一致 !';
					this.show_error_password2 = true;
				}else{
					this.password2_focus();
					this.password2_right = true
				}
            },
			email_focus: function () {
				this.show_error_email = false;
				this.email_right = false;
            },
			check_email: function () {
            	if (!/^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/.test(this.email)){
            		this.email_error_message = '邮箱格式有误!';
            		this.show_error_email = true;
				}else{
            		this.email_focus();
            		this.email_right = true;
				}
            },
			check_allow: function () {
				if (!this.allow){
					this.show_error_allow = true;
				}else{
					this.show_error_allow = false;
				}
            },
			image_code_focus: function () {
				this.show_error_image_code = false;
            },
			check_image_code: function () {
				if (!this.image_code){
					this.image_code_error_message = '请填写验证码!';
					this.show_error_image_code = true;
				}else{
					this.image_code_focus();
				}
            },

			// 用户登录
			user_login: function () {
            	this.check_login_username();
            	this.check_login_password();
            	this.check_login_image_code();
            	if (this.show_login_username_error==false && this.show_login_password_error==false && this.show_login_image_code_error==false){
            		axios.post()
				}



            },
			// 用户注册
			register_user: function () {
            	this.check_username();
            	this.check_password();
            	this.check_password2();
            	this.check_email();
            	this.check_allow();
            	this.check_image_code();

            	if (this.show_error_username==false && this.show_error_password==false && this.show_error_password2==false &&
				this.error_email==false && this.show_error_allow==false && this.show_error_image_code==false){
            		axios.post(this.host + '/users/', {
					username: this.username,
					password: this.password,
					password2: this.password2,
					image_code: this.image_code,
					image_code_id: this.image_code_id,
					email: this.email,
					allow: this.allow,
				},{
					responseType: 'json',
				})
					.then(response => {
						alert('注册成功');
						alert(response.data)

					})
					.catch(error => {
						alert(error.data)
					})
				}

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
