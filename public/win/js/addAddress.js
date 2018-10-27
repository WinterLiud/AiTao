/**
 * Created by 冬哥 on 2018/10/26.
 */
$(function(){

    var isEdit=Number(getParamsByUrl(location.href, 'isEdit'));
    if(isEdit){
        if(localStorage.getItem('editAddress')){
            var address=JSON.parse(localStorage.getItem('editAddress'));
            //console.log(address);
            var html=template('editTpl',address);
            $('.editForm').html(html);
        }
    }else{
        var html = template("editTpl",{});

        $('.editForm').html(html);
    }

    var picker = new mui.PopPicker({layer:3});
    picker.setData(cityData);
    $('#selectCity').on('tap', function(){

        // 显示picker选择器
        picker.show(function(selectItems){

            // 将用户选择的内容显示在文本框中
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });

    });

    $('#addAddress').on('click',function(){
        var username=$('.username').val();
        var postCode=$('.postCode').val();
        var city=$('.city').val();
        var detail=$('.detail').val();

        if(!username){
            mui.toast('请输入用户名');
            return;
        }
        if(!postCode){
            mui.toast('请输入邮政编码');
            return;
        }

        var data={
            address:city,
            addressDetail:detail,
            recipients:username,
            postcode:postCode
        };

        if(isEdit){
            var url='/address/updateAddress';
            data.id=address.id;
        }else{
            var url = "/address/addAddress";
        }

        $.ajax({
            url:url,
            type:'post',
            data:data,
            success:function(res){
                if(isEdit){
                    mui.toast("地址修改成功");
                }else{
                    mui.toast("地址添加成功");
                }

                setTimeout(function(){
                    location.href = "address.html";
                },1000)
            }
        })
    })

});