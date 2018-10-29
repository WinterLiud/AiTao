/**
 * Created by 冬哥 on 2018/10/28.
 */
$(function(){

    $.ajax({
        url:'/product/queryProductDetailList',
        type:'get',
        data:{
            page:1,
            pageSize:100
        },
        success:function(res){
            //console.log(res);
            var html=template('productTpl',res);
            $('.productBox').html(html);
        }
    });


    //获取二级分类并展示
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100
        },
        success: function(res){
            console.log(res);
            var html = template("secondTpl", res);
            $('#secondBox').html(html);
        }
    });

    var imageArray=[];
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            imageArray.push(data.result);
        }
    });

    $('#addProduct').on('click',function(){
        var proName=$('.proName').val();
        var proDesc=$('.proDesc').val();
        var num=$('.num').val();
        var size=$('.size').val();
        var oldPrice=$('.oldPrice').val();
        var price=$('.price').val();
        var brandId=$('.brandId').val();

        $.ajax({
            url:'/product/addProduct',
            type:'post',
            data:{
                proName:proName,
                oldPrice:oldPrice,
                price:price,
                proDesc:proDesc,
                size:size,
                statu:1,
                num:num,
                brandId:brandId
            },
            success:function(res){
                if(res.success){
                    location.reload();
                }
            }
        })
    })
});