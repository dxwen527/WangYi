$(function () {
    //判断是否存在该用户(匹配用户名和密码是否一致)
    $("#btn").click(function () {
        //判断输入框是否输入完成
        if ($("#username").val() == "") {
            $(".div").animate({height: 35}, 100)
            $(".right_top").animate({height: 112}, 100)
            $(".center").animate({height: 374}, 100)
            $("#prompt").show();
            $("#prompt").html("请输入账号")
            $("#username").focus(function () {
                $(".div").animate({height: 10}, 100)
                $(".right_top").animate({height: 93}, 100)
                $(".center").animate({height: 360}, 100)
                $("#prompt").hide();
            })
        } else if ($("#pwd").val() == "") {
            $(".div").animate({height: 35}, 100)
            $(".right_top").animate({height: 112}, 100)
            $(".center").animate({height: 374}, 100)

            $("#prompt").show();
            $("#prompt").html("请输入密码")
            $("#pwd").focus(function () {
                $(".div").animate({height: 10}, 100)
                $(".right_top").animate({height: 93}, 100)
                $(".center").animate({height: 360}, 100)
                $("#prompt").hide();
            })
        } else {
            var users = $.cookie("users");//表示不有没有  都赋值给  user
            if (users) {
                users = JSON.parse(users);//cookie中所有注册过的用户
                var isTrue = false;//表示是否存在该用户
                for (var i = 0; i < users.length; i++) {
                    if (users[i].name == $("#username").val() && users[i].pwd == $("#pwd").val()) {
                        console.log("登入成功");
                        var timer = setTimeout(function () {
                            location.href = "index.html"
                        }, 3000);
                        isTrue = true;
                    }
                }
                if (!isTrue) {
                    console.log("用户名或密码错误，请重新输入")
                    $(".div").animate({height: 35}, 100)
                    $(".right_top").animate({height: 112}, 100)
                    $(".center").animate({height: 374}, 100)

                    $("#prompt").show();
                    $("#prompt").html("用户名或密码错误")
                    $("#pwd").focus(function () {
                        $(".div").animate({height: 10}, 100)
                        $(".right_top").animate({height: 93}, 100)
                        $(".center").animate({height: 360}, 100)
                        $("#prompt").hide();
                    })
                    $("#username").focus(function () {
                        $(".div").animate({height: 10}, 100)
                        $(".right_top").animate({height: 93}, 100)
                        $(".center").animate({height: 360}, 100)
                        $("#prompt").hide();
                    })
                }
            }
            else {
                console.log("不存在该用户，请先注册");
            }
        }

    })
})
