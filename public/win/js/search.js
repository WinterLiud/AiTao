/**
 * Created by 冬哥 on 2018/10/23.
 */
$(function(){


    $('#btn').on('click',function(){
        var keyword=$(this).siblings('input').val();
        if(keyword){
            arr.unshift(keyword);
            //将关键字数组存储在本地
            localStorage.setItem('arr',JSON.stringify(arr));
            console.log(arr);
            location.href="search-result.html?keyword="+keyword;
        }else{
            alert("您输入的商品名为空");
        }
    });

    var arr=[];
    //判断本地存储中是否有已经存储的关键字
    if(localStorage.getItem('arr')){
        arr=JSON.parse(localStorage.getItem('arr'));
        var html=template('historyList',{result:arr});
        $('.mui-table-view').html(html);
    }

    $('.clear').on('click',function(){
        $('.mui-table-view').html('');
        localStorage.removeItem('arr');
    })
});