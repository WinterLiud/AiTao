/**
 * Created by ���� on 2018/10/26.
 */
//��ѯ,���������Ϣ
var userInfo=null;
$.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    success:function(res){
        //console.log(res);
        if(res.error&&res.error==400){
            location.href='login.html';
        }else{
            var html=template('userTpl',res);
            $('.userBox').html(html);
        }
    }
});
$(function(){

    $('.logout').on('click',function(){
        $.ajax({
            url:'/user/logout',
            type:'get',
            success:function(res){
                console.log(res);
                if(res.success){
                    mui.toast('�˳���¼�ɹ�');
                    setTimeout(function(){
                        location.href='index.html';
                    },1000);
                }
            }
        })
    });

});