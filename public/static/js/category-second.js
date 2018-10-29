/**
 * Created by 冬哥 on 2018/10/28.
 */
$(function(){

    var page=1;
    var pageSize=5;
    var totalPage=0;
    getData();

    $('#nextBtn').on('click',function(){
        page++;
        if(page>totalPage){
            page=totalPage;
            alert('亲，已经是最后一页了');
            return;
        }
        getData();
    });
    $('#prevBtn').on('click',function(){
        page--;
        if(page<1){
            page=1;
            alert('亲，已经是第一页了');
            return;
        }
        getData();
    });

    function getData(){
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(res){
                //console.log(res);
                totalPage=Math.ceil(res.total/pageSize);
                var html=template('categorySecondTpl',res);
                $('.categorySecondBox').html(html);
            }
        })
    }

    //二级分类添加，获取一级分类数据并显示
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page: 1,
            pageSize: 100
        },
        success:function(res){
            var html=template('categoryFirstTpl',res);
            $('.categoryFirst').html(html);
        }
    });

    var previewImg='';
    //上传图片
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data.result.picAddr);
            $('#preview').attr("src",data.result.picAddr);
            previewImg = data.result.picAddr;
        }
    });

    $('.save').on('click',function(){
        var categoryId=$('.categoryId').val();
        var brandName=$('.brandName').val();

        $.ajax({
            url:'/category/addSecondCategory',
            type:'post',
            data:{
                categoryId:categoryId,
                brandName:brandName,
                brandLogo:previewImg,
                hot:0
            },
            success:function(res){
                //console.log(res);
                if(res.success){
                    location.reload();
                }
            }
        })

    })
});
