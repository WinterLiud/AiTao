/**
 * Created by 冬哥 on 2018/10/27.
 */
$(function(){

    var kucun=null;
    var size=null;
    var productId=0;

    var id = getParamsByUrl(location.href, 'id');
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{
            id:id
        },
        success:function(res){
            console.log(res);
            kucun=res.num;
            productId=res.id;

            var html=template('productTpl',res);
            $('.productBox').html(html);

            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });

    $('.productBox').on('click','.size span',function(){
        $(this).addClass('active').siblings().removeClass('active');
        size=$(this).html();
    });

    $('#increase').on('click',function(){
        var num=$('#inp').val();
        num++;
        if(num>kucun){
            num=kucun;
        }
        $('#inp').val(num);
    })
    $('#reduce').on('click',function(){
        var num=$('#inp').val();
        num--;
        if(num<1){
            num=1;
        }
        $('#inp').val(num);
    });

    //加入购物车
    $('#addCart').on('click',function(){
        if(!size){
            alert('请选择尺码');
            return;
        }
        $.ajax({
            url:'/cart/addCart',
            type:'post',
            data:{
                productId:productId,
                num:kucun,
                size:size
            },
            success:function(res){
                //console.log(res);
                if(res.success){
                    mui.confirm('加入成功，跳转到购物车吗？',function(message){
                        if(message.index){
                            location.href='cart.html';
                        }
                    })
                }
            }
        })
    })

});