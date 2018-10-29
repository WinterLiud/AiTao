/**
 * Created by 冬哥 on 2018/10/25.
 */
$(function(){

    $('#register-btn').on('click',function(){
        var username=$('.username').val();
        var mobile=$('.mobile').val();
        var password=$('.password').val();
        var againPass=$('.againPass').val();
        var Vcode=$('.Vcode').val();

        if(!username){
            mui.toast('请输入用户名');
            return;
        }
        if(mobile.length<11){
            mui.toast('请输入合法手机号');
            return;
        }
        if(password!=againPass){
            mui.toast('两次输入密码不一样');
            return;
        }

        $.ajax({
            url:'/user/register',
            type:'post',
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode: Vcode
            },
            success:function(res){
                mui.toast('成功');
                console.log(res)
                setTimeout(function(){
                    location.href='login.html';
                },1000);
            }
        })

    });
    $('#getCode').on('click', function(){
        $.ajax({
            url: '/user/vCode',
            type: 'get',
            success: function(res){
                console.log(res.vCode);
            }
        })

    });
});