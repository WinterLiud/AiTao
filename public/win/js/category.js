/**
 * Created by ¶¬¸ç on 2018/10/22.
 */
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });

    mui('.my-footer').on('tap','a',function(){
        window.top.location.href=this.href;
    });

  $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        success:function(res){
            //console.log(res);
          var html=template("category-first",{
                result:res.rows
            });

            $('.links').html(html);
            if(res.rows.length){
                $('.links').find('a').eq(0).addClass('active');
                var id=res.rows[0].id;
                getSecondCategory(id);
            }
        }
    });

    $('#link').on('click','a',function(){
        var id=$(this).attr('data-id');
        //console.log(id);
        $(this).addClass('active').siblings().removeClass('active');

        getSecondCategory(id);
    });

    function getSecondCategory(id){
        $.ajax({
            url:"/category/querySecondCategory",
            type:"get",
            data:{
                id:id
            },
            success:function(res){
                console.log(res);
                var html=template("category-second",{
                    result:res.rows
                });
                $('.list').html(html);
            }
        })
    }
});

