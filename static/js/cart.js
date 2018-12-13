$(function () {
    // 购物车加操作
    $('.num .jia').click(function () {
        var goodsid = $(this).attr('goodsid')
        var $that = $(this)
        $.get('/addbag/',{'goodsid':goodsid},function (response) {
            console.log(response)
            if (response.status == 1){
                $that.prev().show().html(response.number)
            }
        })
    })
    //　购物车减操作
    $('.num .jian').click(function () {
         var goodsid = $(this).attr('goodsid')
        var $that = $(this)
        $.get('/subbag/',{'goodsid':goodsid},function (response) {
            console.log(response)
            if (response.status == 1){
                if (response.number > 0){
                    $that.next().html(response.number)
                } else{
                    // $that.next().hide()
                    $that.hide()
                }
            }
        })
    })
})