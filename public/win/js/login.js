/**
 * Created by 冬哥 on 2018/10/26.
 */
$(function(){

    $('#login-btn').on('click',function(){
        var username=$('.username').val();
        var password=$('.password').val();

        if(!username){
            mui.toast('请输入用户名');
            return;
        }
        if(!password){
            mui.toast('请输入密码');
            return;
        }

        $.ajax({
            url:'/user/login',
            type:'post',
            data:{
                username:username,
                password:password
            },
            success:function(res) {
                mui.toast('登录成功');
                console.log(res);
                setTimeout(function () {
                    location.href = 'user.html';
                }, 1000);
            }
        })
    });
});