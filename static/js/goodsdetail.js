$(function () {
  


    // 减操作
    // $('.buy .jian').click(function () {
    //     var goodsid = $(this).attr('goodsid')
    //     var $that = $(this)
    //     $.get('/subcart/',{'goodsid':goodsid},function (response) {
    //         console.log(response)
    //         if (response.status == 1){
    //             if (response.number > 0){
    //                 $that.show()
    //                 $that.next().html(response.number)
    //             } else{
    //                 // $that.next().hide()
    //                 $that.hide()
    //             }
    //         }
    //     })
    // })

    // 加操作
    $('.buy .jia').click(function () {
        var value = parseInt($('.sum').attr('value'))
        $('.sum').attr('value',value+1)
    })
    // 减操作
    $('.buy .jian').click(function () {
        var value = parseInt($('.sum').attr('value'))
        if (value>1){
            $('.sum').attr('value',value-1)
        } else{
           $('.sum').attr('value')
        }
    })
    // 加操作
    $('.cost .cost_span2').click(function () {
        // 获取商品ＩＤ
        var goodsid = $(this).attr('goodsid')
        $.get('/addcart/',{'goodsid':goodsid},function (response) {
            console.log(response)
            if (response.status == -1){ // 未登录，调到登录页面
                alert('请登录后再操作')
                window.open('/login/',target = '_self')
             } else if (response.status == 1){ // 添加成功
                alert('添加购物车成功')
            }
        })
    })
})
