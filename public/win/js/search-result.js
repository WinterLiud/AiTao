/**
 * Created by 冬哥 on 2018/10/25.
 */

$(function(){

//获取地址栏中的关键字
    var keyword=getParamsByUrl(location.href,"keyword");
    var page=1;
    var This=null;
    var html='';
    var price=1;

    function getParamsByUrl(url, name) {

        var params = url.substr(url.indexOf('?')+1);

        var param = params.split('&');

        for(var i=0;i<param.length;i++){

            var current = param[i].split('=');

            if(current[0] == name){

                return current[1]

            }

        }

        return null;

    }

    mui.init({
        pullRefresh : {
            container: '#refresh',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    $('#price').on('tap',function(){
        price=price==1?2:1;
        html='';
        page=1;
        mui('#refresh').pullRefresh().refresh(true);
        getData();
    });

    function getData(){

        if(!This){
            This = this;
        }
        //var This=this;

        $.ajax({
            url:'/product/queryProduct',
            type:'get',
            data:{
                page:page++,
                pageSize:3,
                proName: keyword,
                //price: priceSort
            },
            success:function(res){
                console.log(res);
                if(res.data.length>0){
                    html+=template('search',res);
                    $('.search-box').html(html);
                    console.log(html);
                    // 告诉上拉加载组件当前数据加载完毕
                    This.endPullupToRefresh(false);
                }else{
                    // 告诉上拉加载组件当前数据加载完毕
                    This.endPullupToRefresh(true);
                }

            }
        })
    }
});
