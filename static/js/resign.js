//			帐号
$(function () {
    //账号滚动封装
    function textmove() {
        $(".text2").hide();
        $(".text1").show();
        $(".text1").html("帐号须由6-18个字符组成")
        $(".text1").animate({left: 640}, 200)
        $(".text1").animate({left: 720}, 200)
        $(".text1").animate({left: 640}, 200)
        $(".text1").animate({left: 740}, 200)
        $(".text1").animate({left: 680}, 200)

    }

    //密码滚动封装
    function pwdmove() {
        $(".pwd2").hide();
        $(".pwd").show();
        $(".pwd").html("输入密码错误")
        $(".pwd").animate({left: 640}, 200)
        $(".pwd").animate({left: 720}, 200)
        $(".pwd").animate({left: 640}, 200)
        $(".pwd").animate({left: 740}, 200)
        $(".pwd").animate({left: 680}, 200)
    }

    //再次输入密码滚动封装
    function nextpwdmove() {
        $(".nextpwd2").hide();
        $(".nextpwd").show();
        $(".nextpwd").html("输入密码错误")
        $(".nextpwd").animate({left: 640}, 200)
        $(".nextpwd").animate({left: 720}, 200)
        $(".nextpwd").animate({left: 640}, 200)
        $(".nextpwd").animate({left: 740}, 200)
        $(".nextpwd").animate({left: 680}, 200)
    }

    //手机号滚动封装
    function phonemove() {
        $(".phone2").hide();
        $(".phone").show();
        $(".phone").html("输入手机号不正确")
        $(".phone").animate({left: 640}, 200)
        $(".phone").animate({left: 720}, 200)
        $(".phone").animate({left: 640}, 200)
        $(".phone").animate({left: 740}, 200)
        $(".phone").animate({left: 680}, 200)
    }

    //随机验证码滚动封装
    function txtmove() {
        $(".txt2").hide();
        $(".txt").show();
        $(".txt").html("输入密码错误")
        $(".txt").animate({left: 640}, 200)
        $(".txt").animate({left: 720}, 200)
        $(".txt").animate({left: 640}, 200)
        $(".txt").animate({left: 740}, 200)
        $(".txt").animate({left: 680}, 200)
    }

    var isTrue = false;
    $("#text").blur(function () {
        var reg = /^[a-zA-Z0-9]{6,18}$/;
        var text1 = $("#text").val();
        if (!reg.test(text1)) {//判断自身是否输入值   与正则匹配  不相同则错误
            if (text1 == "") {//如果点击了没有输入  不匹配  特例
                $(".text1").hide();
                $(".text2").hide();
                return false;
            }
            textmove()

            isTrue = false
        } else {//否则正确
            $(".text1").hide();
            $(".text2").html("输入正确")
            $(".text2").show();
            isTrue = true;
        }
    })
    //密码验证
    var ispwd = false;
    $("#pwd").blur(function () {
        if (isTrue) {//根据布尔  判断  上一层是否正确  如果正确  则可以判断自身
            var reg = /^[a-zA-Z\d_]{6,12}$/A
            var pwd = $("#pwd").val();

            if (!reg.test(pwd)) {
                if (pwd == "") {
                    $(".pwd").hide();
                    $(".pwd2").hide();
//                			    $(".text1").hide();
//          				    $(".text2").hide();
                    return false;
                }
                pwdmove();
                ispwd = false
            } else {

                $(".pwd").hide();
                $(".pwd2").show();
                $(".pwd2").html("输入正确")
                ispwd = true;
            }
        } else {//如果上一层不正确  则 将自己的隐藏   并提示上一层错误

            $("#pwd").val("");
            $(".pwd").hide();
            $(".pwd2").hide();
            if ($("#text").val() == "") {//特例  如果上一层 没有输入  则不提示
                $(".text1").hide();
                $(".text2").hide();
                return false;

            }
            textmove()

        }
    })
    //确认密码
    var isnextpwd = false;
    $("#nextpwd").blur(function () {
        if (ispwd) {
            var nextpwd = $("#nextpwd").val();
            var pwd = $("#pwd").val();
            if (nextpwd != pwd || nextpwd == "") {

                if (nextpwd == "") {
                    $(".nextpwd").hide();
                    $(".nextpwd2").hide();
                    return false;
                }
                nextpwdmove()
                isnextpwd = false;
            } else {
                $(".nextpwd").hide();
                $(".nextpwd2").show();
                $(".nextpwd2").html("输入正确")
                isnextpwd = true
            }
        } else {

            $("#nextpwd").val("");
            $(".nextpwd").hide();
            $(".nextpwd2").hide();
            if ($("#pwd").val() == "") {
                $(".pwd").hide();
                $(".pwd2").hide();
                return false;

            }
            pwdmove();
        }

    })
    //手机号
    var isphone = false;
    $("#phone").blur(function () {
        if (isnextpwd) {
            var phone = $("#phone").val();
            var reg = /^1[3|4|5|8]\d{9}$/;
            if (!reg.test(phone)) {
                if (phone == "") {
                    $(".phone").hide();
                    $(".phone2").hide();
                    return false;
                }

                phonemove()
                isphone = false;
            } else {
                $(".phone").hide();
                $(".phone2").html("输入正确")
                $(".phone2").show();
                isphone = true;
            }
        } else {
            $("#phone").val("");
            $(".phone").hide();
            $(".phone2").hide();
            if ($("#nextpwd").val() == "") {
                $(".nextpwd").hide();
                $(".nextpwd2").hide();
                return false;
            }
            nextpwdmove()
        }


    })
//          	/^1[3|4|5|8] \d{9}$/.test(sPhone)


    // 点击获取验证码  随机出现  4 位 验证码
    $("#put2").click(function () {
        //  4为随机的 数字  大小写字母的   验证码
        var strSum = "";
        for (i = 0; i < 4; i++) {
            var isTrue = parseInt(Math.random() * 100) % 3//  0   1   2  得到3种结果；
            var num = 0;
            if (isTrue == 0) {
                num = parseInt(Math.random() * 100) % 26 + 97;
            }
            else if (isTrue == 1) {
                num = parseInt(Math.random() * 100) % 10 + 48;
            }
            else {
                num = parseInt(Math.random() * 100) % 26 + 65;
            }
            var str = String.fromCharCode(num);//把对应的ascii码值  转换成对应的字符串
            strSum = strSum.concat(str);
        }
//                             printOut(strSum);
        $("#put1").css("font-size", "18px")
        $("#put1").val(strSum);
    })
    //输入验证码
    var istxt = false;
    $("#txt").blur(function () {
        if (isphone) {
            var txt = $("#txt").val();
            var put1 = $("#put1").val();
            if (txt != put1 || txt == "") {
                if (txt == "") {
                    $(".txt").hide();
                    $(".txt2").hide();
                    return false;
                }
                txtmove()
                istxt = false;
            } else {
                $(".txt").hide();
                $(".txt2").show();
                $(".txt2").html("输入正确")
                istxt = true;
            }
        } else {
            $("#txt").val("");
            $(".txt").hide();
            $(".txt2").hide();
            if ($("#phone").val() == "") {
                $(".phone").hide();
                $(".phone2").hide();
                return false;
            }
            phonemove()
        }

    })
    //cookie 注册用户
    $("#btn").click(function () {
        //点击注册按钮时   要判断以上输入框  是否输入正确  和  输入完成
        if (isTrue == true && ispwd == true && isnextpwd == true && isphone == true && istxt == true) {
            //注册(cookie存储)
            var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
            //先判断是否存在该用户
            for (var i = 0; i < users.length; i++) {
                if (users[i].name == $("#text").val()) {
                    alert("该用户已注册")
                    return;//说明已经存在该用户  不能注册相同的用户
                }
            }
            //注册用户
            var user = {
                name: $("#text").val(),
                pwd: $("#pwd").val()
            }
            users.push(user);
            $.cookie("users", JSON.stringify(users), {expires: 10, path: "/"});
            console.log("注册成功")
            var timer = setTimeout(function () {
                location.href = "login.html";
            }, 3000);
        } else {
            if (isTrue == false) {
                textmove()
            }
            if (ispwd == false) {
                pwdmove();
            }
            if (isnextpwd == false) {
                nextpwdmove()
            }
            if (isphone == false) {
                phonemove()
            }
            if (istxt == false) {
                txtmove()
            }
        }

    })


})