/**
 * Created by 冬哥 on 2018/10/26.
 */
$(function(){

    var address=null;
    $.ajax({
        url:'/address/queryAddress',
        type:'get',
        success:function(res){
            address=res;
            var html=template('addressTpl',{result:res});
            $('.addressBox').html(html);
        }
    });

    //删除收货地址
    $('.addressBox').on('click','.delete-btn',function(){
        var id=$(this).attr('data-id');
        var li=this.parentNode.parentNode;
        mui.confirm('确定要删除吗？',function(message){
            //console.log(message)
            if(message.index==1){
                $.ajax({
                    url:'/address/deleteAddress',
                    type:'post',
                    data:{
                        id:id
                    },
                    success:function(res){
                        if(res.success){
                            location.reload();
                        }
                    }
                })
            }else{
                mui.swipeoutClose(li);
            }
        })
    });

    //编辑收货地址
    $('.addressBox').on('click','.edit-btn',function(){
        var id=this.getAttribute('data-id');
        for (var i = 0; i < address.length; i++) {
            if(address[i].id==id){
                localStorage.setItem('editAddress',JSON.stringify(address[i]));
                break;
            }

        }
        location.href='addAddress.html?isEdit=1';
    })
});