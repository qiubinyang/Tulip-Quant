// 登陆页面跳转部分
function toAccount() {
    $(".verifyCodeTab").removeClass("selected");
    $(".accountTab").addClass("selected");
    $(".verifyCode,.select-container").addClass("hidden");
    $(".account").removeClass("hidden");
    $(".phone-number").attr({
        "placeholder": "手机号码或邮箱地址",
        "name": "username",
        "type": "text",
        "id": "username"
    })
}

function toVerifycode() {
    $(".verifyCodeTab").addClass("selected");
    $(".accountTab").removeClass("selected");
    $(".verifyCode,.select-container").removeClass("hidden");
    $(".account").addClass("hidden");
    $(".phone-number").attr({
        "placeholder": "手机号码",
        "name": "phone",
        "type": "tel",
        "id": "phone-number"
    })
}

function backLogin() {
    $(".login-tabs,.subhead, .forgetPassword").removeClass("hidden");
    $(".register-title, .name").addClass("hidden");
    toAccount();
    $(".btn-confirm").attr({
        "value": "确认登录",
        "id":"loginButton"
    });
}

function register() {
    $(".tulipDialog-model").first().removeClass("hidden");
    $(".login-tabs,.subhead, .forgetPassword").addClass("hidden");
    $(".register-title, .select-container, .getVerifyCode, .name").removeClass("hidden");
    $(".password").parent().removeClass("hidden");
    $(".btn-confirm").attr({
        "value": "注册",
        "id":"registerButton"
    });
    $(".phone-number").attr({
        "placeholder": "手机号码",
        "name": "phone",
        "type": "tel",
        "id": "phone-number"
    })
}

// cookie处理
function addCookie(name, val, expireHour) {
    var cookieString = name + "=" + escape(val);
    if (expireHour > 0) {
        var date = new date();
        date.setTime(data.getTime + expireHour * 3600 * 1000);
        cookieString = cookieString + ";expire=" + date.toGMTString();
    }
    document.cookie = cookieString;
}

// function getCookie(name){
//     var strCookie = document.cookie;
//     var arrCookie = strCookie.split(";");
//     for (var i=0;i<arrCookie.length;i++){
//         var arr = arrCookie[i].split("=");
//         if (arr[0] == name)
//             retur arr[1];
//     }
//     return "";
// }

function getCookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    if (results)
        return (unescape(results[2]));
    else
        return null;
}

function deleteCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=expire;expire=" + date.toGMTString();
}
// 登陆成功后页面变化
function hasLoginSuccess(udata) {
    $(".tulipDialog-model,#login-wrap").first().addClass("hidden");
    $("#menu").css("margin-right", "42px");
    // 管理员登陆
    if(data.user.admin){
        $("#admin").removeClass("hidden"); 
    }
    else{
        $("#userCenter").removeClass("hidden");
    }
}

function popSell(){
    window.location.href("celue.html");
    $("#sell").click();
}

// 主函数部分
$(function() {
    $("#login").click(function() {
        $(".tulipDialog-model").first().removeClass("hidden");
        backLogin();
    });
    $(".iconCancel").click(function() {
        $(".tulipDialog-model").first().addClass("hidden");
    });
    $(".verifyCodeTab").click(function() {
        toVerifycode();
    });

    $(".accountTab").on("click", function() {
        toAccount();
    });
    $(".changeToAccount").on("click", function() {
        toAccount();
    });

    $(".haiwaimobile").click(function() {
        $(".select-container").removeClass("hidden");
    });

    // 点击注册按钮
    $("#register.text-gray").click(function() {
        register();
    })
    $("#register").click(function() {
        register();
    })
    $(".btn-goto-login").click(function() {
        backLogin();
    });

    //敲击了Enter键确认
    $(document).keyup(function(event) {
        if (event.keyCode == 13) {
            $(".btn-confirm").trigger("click");
        }
    });

    // 点击登陆按钮
    $("#loginButton").click(function() {
        var phone = $("#phone-number").val();
        var password = $("#password").val();

        $.ajax({
            type: "POST",
            url: "",
            dataType: "json",
            data: {
                    "uPhone": phone,
                    "password":password,
            },
            success: function(data) {
                if (data.success) {
                    addCookie(username, username, 0.2);
                    hasLoginSuccess();
                    // var customerPhone = data.user.uPhone;
                    // window.location.href = 'http://localhost/index.html'; //正确登录后页面跳转至 
                } else {
                    alert("用户名或密码错误！");
                    // if (tel != data.tel) { //判断是用户名还是密码错误，提示相应信息 
                    //     alert(data.message);
                    //     $tel.val("");
                    //     $pwd.val("");
                    //     return false;
                    // }
                    // if (pwd != data.pwd) {
                    //     alert(data.message);
                    //     $pwd.val("");
                    //     return false;
                    // }
                }
            },
            error: function() {
                alert("异常！");
            }
        });
    });

// 点击注册按钮
    $("#registerButton").click(function() {
        var phone = $("#phone-number").val();
        var name = $("#name").val();
        var password = $("#password").val();

        $.ajax({
            type: "POST",
            url: "",
            dataType: "json",
            data: {
                    "uPhone": phone,
                    "uName": name,
                    "password":password,
            },

            success: function(data) {
                if (data.success) {
                       backLogin();
                } else {
                    alert("注册失败！");
                    // if (tel != data.tel) { //判断是用户名还是密码错误，提示相应信息 
                    //     alert(data.message);
                    //     $tel.val("");
                    //     $pwd.val("");
                    //     return false;
                    // }
                    // if (pwd != data.pwd) {
                    //     alert(data.message);
                    //     $pwd.val("");
                    //     return false;
                    // }
                }
            },
            error: function() {
                alert("异常！");
            }
        });
    });

    // 输入有效性确认
    $.validator.addMethod("isMobileOrEmail", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return this.optional(element) || (email.test(value) || mobile.test(value));
    }, "无效手机或邮箱");

    $.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return mobile.test(value);
    }, "无效手机");
})

$().ready(function(event) {
    $(".tab-pane").validate({
        rules: {
            phone: {
                required: true,
                isMobile: true
            },
            username: {
                required: true,
                isMobileOrEmail: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 18
            }
        },
        messages: {
            phone: {
                required: "用户名不允许为空",
                isMobile: "无效手机"
            },
            username: {
                required: "用户名不允许为空",
                username: "无效手机或邮箱"
            },
            password: {
                required: "请输入密码",
                minlength: "密码至少6位",
                maxlength: "密码至多18位"
            }
        },
        success: function(label) {
            $(".btn-confirm").removeAttr("disabled");

        }
        // showErrors:function(errorMap, errorList){
        //  for(var obj in errorMap)
        //         $('#' + obj).parent().addClass('has-error');
        //        this.defaultShowErrors();
        // }
    });
    //    $("input").on('input', function() {
    //    if(validate($(this).val())) 
    //        successHandler();
    //     else 
    //        errorHandler();    
    // })
})

// function errorHandler() {
//     this.parent().addClass("has-error");
// }