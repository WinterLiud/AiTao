/**
 * Created by ¶¬¸ç on 2018/10/28.
 */
$(function(){


    $.ajax({
        url:'/user/queryUser',
        type:'get',
        data:{
            page:1,
            pageSize:10
        },
        success:function(res){
            console.log(res);
            var html=template('userTpl',res);
            $('.userBox').html(html);
        }
    });

    $('.userBox').on('click','.edit-btn',function(){
        var isDelete=$(this).data('isdelete');
        var id=$(this).data('id');

        $.ajax({
            url:'/user/updateUser',
            type:'post',
            data:{
                id:id,
                isDelete:isDelete ? 0:1
            },
            success:function(res){
                console.log(res);
                if(res.success){
                    location.reload();
                }
            }
        })
    })
});
