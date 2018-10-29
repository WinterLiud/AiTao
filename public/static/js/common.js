$.ajax({
	url:'/employee/checkRootLogin',
	type:'get',
	async:false,
	success:function(res){
		if(res.error && res.error == 400){
			location.href = "login.html";
		}
	}
});

$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});