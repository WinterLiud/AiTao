/**
 * Created by 冬哥 on 2018/10/26.
 */
//查询,保存个人信息
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
                    mui.toast('退出登录成功');
                    setTimeout(function(){
                        location.href='index.html';
                    },1000);
                }
            }
        })
    });

});