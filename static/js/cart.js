$(function () {

    // 购物车加操作
    $('.num .jia').click(function () {
        var goodsid = $(this).attr('goodsid')
        var $that = $(this)
        $.get('/addbag/', {'goodsid': goodsid}, function (response) {
            console.log(response)
            if (response.status == 1) {
                $that.prev().show().html(response.number)
            }
        })
    })
    //　购物车减操作
    $('.num .jian').click(function () {
        var goodsid = $(this).attr('goodsid')
        var $that = $(this)
        $.get('/subbag/', {'goodsid': goodsid}, function (response) {
            console.log(response)
            if (response.status == 1) {
                if (response.number > 0) {
                    $that.next().html(response.number)
                } else {
                    // $that.next().hide()
                    $that.hide()
                }
            }
        })
    })

    //　勾选处理
    $('.box2 .chose').click(function () {
        var cartid = $(this).attr('cartid')
        var $span = $(this).find('span')

        $.get('/changecartstatus/', {'cartid': cartid}, function (response) {
            console.log(response)
            if (response.status) {
                var isselect = response.isselect
                if (isselect) {
                    $span.removeClass('no').addClass('glyphicon glyphicon-ok')
                } else {
                    $span.removeClass('glyphicon glyphicon-ok').addClass('no')
                }
            }
            total()
        })
    })

    //　全选/取消全选
    $('.div1 .no').click(function () {
        var isall = $(this).attr('isall')
        isall = (isall == 'false') ? true : false
        $(this).attr('isall', isall)
        //　样式显示
        var $span = $(this)
        if (isall) {
            $span.removeClass('no').addClass('glyphicon glyphicon-ok')
        } else {
            $span.removeClass('glyphicon glyphicon-ok').addClass('no')
        }
        // 发起ajax请求
        $.get('/changecartisall/', {'isall': isall}, function (response) {
            console.log(response)
            if (response.status){
                // 遍历每一个勾选项
                $('.box2 .chose').each(function () {
                    if (isall){ // 全选
                        $(this).find('span').removeClass('no').addClass('glyphicon glyphicon-ok')
                    } else {    // 取消全选
                        $(this).find('span').removeClass('glyphicon glyphicon-ok').addClass('no')
                    }
                })
                total()
            }
        })
    })

    // 价格计算
    function total() {
        var sum = 0
        var sum1 = 0
        // 个数　x 单价
        $('.box2').each(function () {
            var $chose = $(this).find('.chose')
            var $sum = $(this).find('.sum')
            var $price1 = $(this).find('.price1')

            if ($chose.find('.glyphicon-ok').length){
                var num =  parseInt($sum.attr('sum'))
                var price = parseInt($price1.attr('price1'))

                sum += num * price
                sum1 = num * price
            }
        })
        console.log(sum)
        // 显示金额
        $('.money').html(parseInt(sum))
        // $('.price3').html(parseInt(sum1))
    }

})