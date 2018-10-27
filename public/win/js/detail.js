/**
 * Created by ¶¬¸ç on 2018/10/27.
 */
$(function(){

    var id = getParamsByUrl(location.href, 'id');
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{
            id:id
        },
        success:function(res){
            //console.log(res);
            var html=template('productTpl',res);
            $('.productBox').html(html);

            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });


});