//导航
function navMove(obj){
	var liw=obj.outerWidth();//获取li的宽度
	var lileft=obj.position().left;//获取线条到左边的距离
	$(".nav-box-line").stop(false,true).animate({left:lileft+"px",width:liw+"px"},200);	
}


$(".title-middle-nav li").mouseenter(function(){
	navMove($(this));
});
$(".title-middle-nav").mouseleave(function(){
	navMove($(".title-middle-nav .current"));
});




//登录
$(".title-nav-six,.box-btn-two").click(function(){
	$(".title-nav-eight").slideToggle(200);
	
});

//获得焦点和失去焦点
$(".box-zhanghao").focus(function(){
	if($.trim($(".box-zhanghao").val())=="请输入账号")
	{
		$(".box-zhanghao").val("");
		$(".box-zhanghao").css({"color":"#000"});
	}	
});
$(".box-zhanghao").blur(function(){
	if($.trim($(".box-zhanghao").val())=="")
	{
		$(".box-zhanghao").val("请输入账号");
		$(".box-zhanghao").css({"color":"#999999"});
	}	
});

$(".box-password").focus(function(){
	
		$(".password-gd").text("");
		$(".password-gd").hide();

});
$(".box-password").blur(function(){
	if($.trim($(this).val())=="")
	{
		$(".password-gd").text("请输入密码");
		$(".password-gd").show();
	}
});

//获得网页地址
//alert(window.location.hash);获取地址代码
function address(){
	var addressObj=window.location.hash;
	//alert(addressObj);
	if(addressObj=="#/")
	{
		
		$(".title-nav-one").addClass("current").siblings().removeClass("current");
		
	}
	else if(addressObj=="#/aboutke")
	{
		
		$(".title-nav-two").addClass("current").siblings().removeClass("current");
	}
	else if(addressObj=="#/solution")
	{
		
		$(".title-nav-three").addClass("current").siblings().removeClass("current");
	}
	else if(addressObj=="#/case")
	{
		
		$(".title-nav-four").addClass("current").siblings().removeClass("current");
	}
	else if(addressObj=="#/channel")
	{
		
		$(".title-nav-five").addClass("current").siblings().removeClass("current");
	}
	navMove($(".title-middle-nav .current"));
};




//angular
var app=angular.module("myApp",["ngRoute"]);//创建一个应用对象，加载路由模块（路由的本质是链接跳转，路由就是做单页面应用的主要技术）


//应用的路由配置
app.templatePath="template/";
app.config(['$routeProvider',"$httpProvider",function($route){//$routeProvider是模块的功能，$route是对象
	$route.when('/',{
		templateUrl:app.templatePath+"index.html",
		controller:'index'
	})
	.when('/aboutke',{
		templateUrl:app.templatePath+"aboutke.html",
		controller:'aboutke'
	})
	.when('/solution',{
		templateUrl:app.templatePath+"solution.html",
		controller:'solution'
	})
	.when('/case',{
		templateUrl:app.templatePath+"case.html",
		controller:'case'
	})
	.when('/channel',{
		templateUrl:app.templatePath+"channel.html",
		controller:'channel'
	})
}]);

//首页的控制器
app.controller('index',function($scope){
	
	address();
	
	//幻灯片
	var Flash={};//json，为了减少使用全局变量
	$(".flash-bottom a").click(function(){
		
		if($(this).hasClass("colorA"))//判断第一次触发的时候是否有这个标记（colorA），如果有直接跳出函数。
		{
			return;//跳出函数
		}
		clearTimeout(Flash.Do);//进来的时候不管三七二十一直接清除一下
		var nowPos=$(this).index();//获取当前位置
		var oldPos=$(".colorA").index(".flash-bottom a");//获得旧的位置
		$(this).addClass("colorA").siblings(".colorA").removeClass();//给当前加colorA标，其它兄弟都去除该标记
		$(".flash-middle li").eq(nowPos).stop(false,true).fadeIn(2000);//新的位置背景淡入
		$(".flash-middle li").eq(oldPos).stop(false,true).fadeOut(2000);//旧的位置背景淡出
			
		eval("Flash.Out"+oldPos+"("+oldPos+","+nowPos+")");//eval尽量不用，有时候为了开发需求用一下是可以的，eval作用是字符串拼接并执行代码
		Flash.Do=setTimeout(function(){//使用setTimeout方法有一个缺点，它会去全局找Flash.In这个变量。所以在这个代码中要加eval方法
			eval("Flash.In"+nowPos+"("+nowPos+","+oldPos+")");
		},800);//setimeout（“字符串”，时间)幻灯片进入的时候给它个延迟时间并且执行代码的作用
	});
	
	
	 Flash.In0=function(oldPos,nowPos){//幻灯片1进来设置动画
		
		
		$(".slideone1").stop(false,true).animate({"left":"-1000px"},function(){
			$(this).stop(false,true).animate({"left":"100px"},300);
		});
		$(".slideone2").stop(false,true).delay(100).animate({"left":"-1000px"},function(){
			$(this).stop(false,true).animate({"left":"120px"},300);	
		});
		$(".slideone3").stop(false,true).delay(100).fadeIn(500);
		$(".slideone4").stop(false,true).delay(100).animate({"left":"-2000px"},function(){
			$(this).stop(false,true).animate({"left":"670px"});
		});
	}
	Flash.Out0=function(oldPos,nowPos){//幻灯片1出去设置动画
		$(".slideone1").stop(false,true).animate({"left":"120px"},300,function(){
			$(this).stop(false,true).animate({"left":"-1000px"},300);
		});
		$(".slideone2").stop(false,true).delay(100).animate({"left":"150px"},300,function(){
			$(this).stop(false,true).animate({"left":"-1000px"},300);	
		});
		$(".slideone3").stop(false,true).delay(200).fadeOut(800);
		$(".slideone4").stop(false,true).delay(100).animate({"left":"680px"},500,function(){
		$(this).stop(false,true).animate({"left":"-2000px"});
		});
	}
	
	
	Flash.In1=function(oldPos,nowPos){//进入的时候幻灯片进入
			if(oldPos<nowPos)//为了自动轮播能正常轮播，如果当前值大于旧的值直接给幻灯片向左偏移，为了进来的时候直接从左边进入
			{
				$(".slidetwo1,.slidetwo2,.slidetwo3").css({"left":"-2000px"})
			}
			else//反之幻灯片向右偏移，为了进来的时候直接从右边进入
			{
				$(".slidetwo1,.slidetwo2,.slidetwo3").css({"left":"2000px"})
			}
			
			$(".slidetwo1").stop(false,true).animate({"left":"180px"},function(){
				$(this).stop(false,true).animate({"left":"166px"},300);
			});
			$(".slidetwo2").stop(false,true).delay(100).animate({"left":"180px"},function(){
				$(this).stop(false,true).animate({"left":"166px"},300);	
			});
			$(".slidetwo3").stop(false,true).delay(100).animate({"left":"500px"},function(){
				$(this).stop(false,true).animate({"left":"525px"});
			});
		
	}
	Flash.Out1=function(oldPos,nowPos){//幻灯片2出去设置动画
		
		if(oldPos<nowPos)//中间的幻灯片出去的时候判断现在的值是否大旧的值，幻灯片向左移出
		{
			$(".slidetwo3").stop(false,true).animate({"left":"580px"},500,function(){
				$(this).stop(false,true).animate({"left":"-2000px"},300);
			});
			$(".slidetwo1,.slidetwo2").stop(false,true).delay(200).animate({"left":"180px"},500,function(){
				$(this).stop(false,true).animate({"left":"-2000px"},300);
			});
		}
		else//反之幻灯片向右移出
		{
			$(".slidetwo3").stop(false,true).animate({"left":"500px"},300,function(){
				$(this).stop(false,true).animate({"left":"2500px"});
			});
			$(".slidetwo1,.slidetwo2").stop(false,true).delay(100).animate({"left":"120px"},300,function(){
				$(this).stop(false,true).animate({"left":"2000px"},300);
			});
			
		}
	}
	
	Flash.In2=function(oldPos,nowPos){//幻灯片3进来设置动画
			
			$(".slidethree3").stop(false,true).animate({"left":"500px"},function(){
				$(this).stop(false,true).animate({"left":"525px"},300);
			});
			$(".slidethree1,.slidethree2").stop(false,true).delay(100).animate({"left":"140px"},function(){
				$(this).stop(false,true).animate({"left":"166px"},300);	
			});
	}
	
	Flash.Out2=function(oldPos,nowPos){//幻灯片3出去设置动画
			$(".slidethree3").stop(false,true).animate({"left":"500px"},function(){
				$(this).stop(false,true).animate({"left":"2000px"},300);
			});
			$(".slidethree1,.slidethree2").stop(false,true).delay(300).animate({"left":"140px"},function(){
				$(this).stop(false,true).animate({"left":"2000px"},300);	
			});
	}
	
	
	Flash.Move=function(){//创建自动轮播函数
		var oldPos,nowPos,lastPos;
		oldPos=$(".colorA").index(".flash-bottom a");//找到旧的位置
		lastPos=$(".flash-bottom a").length-1;//找到幻灯片最后的位置
		nowPos=oldPos==lastPos?0:oldPos+1;
		$(".flash-bottom a").eq(oldPos).removeClass("colorA");//给旧的位置去除color标记
		$(".flash-bottom a").eq(nowPos).addClass("colorA");//给新的位置添加colorA标记
		$(".flash-middle li").eq(nowPos).stop(false,true).fadeIn(2000);//新的位置背景淡入
		$(".flash-middle li").eq(oldPos).stop(false,true).fadeOut(2000);//旧的位置背景淡出
		eval("Flash.Out"+oldPos+"("+oldPos+","+nowPos+")");//eval尽量不用，有时候为了开发需求用一下是可以的，eval作用是字符串拼接并执行代码
		Flash.Do=setTimeout(function(){//使用setTimeout方法有一个缺点，它会去全局找Flash.In这个变量。所以在这个代码中要加eval方法
			eval("Flash.In"+nowPos+"("+nowPos+","+oldPos+")");
		},800);//setimeout（“字符串”，时间)幻灯片进入的时候给它个延迟时间并且执行代码的作用
	}
	
	Flash.Auto=window.setInterval(function(){//设置每隔6秒自动轮播
		if(window.location.hash!="#/")//这个判断是为了在其他没有轮播幻灯片的效果时不要触发自动轮播的代码。
		{
			
			window.clearInterval(Flash.Auto);
			Flash=null;//把Flash这个清空掉，减少内存空间
			return;
		}
		 Flash.Move();//调用轮播函数
	},6000);
	$(".flashBT").mouseenter(function(){//鼠标移入到幻灯片下的3个按钮，暂停自动轮播
		clearInterval(Flash.Auto);
	});
	$(".flashBT").mouseleave(function(){//鼠标移出继续轮播
		Flash.Auto=window.setInterval(function(){
			if(window.location.hash!="#/")//这个判断是为了在其他没有轮播幻灯片的效果时不要触发自动轮播的代码。
			{
				
				window.clearInterval(Flash.Auto);
				Flash=null;//把Flash这个清空掉，减少内存空间
				return;
			}
			Flash.Move();
		},6000);
	});


//商标的切换
var bool=true;
$(".merchant-btn a").eq(1).click(function(){//right
	if(bool)
	{
		bool=false;
		var ulw=$(".merchant-middle-list:first").width();//获得其中ul的宽度
		$(".merchant-middle-list").eq(0).stop(false,true).animate({"margin-left":-ulw+"px"},500,function(){
			$(this).appendTo(".merchant-middle-img").css({"margin-left":"0px"});
			bool=true;
		});
		
	}
});

$(".merchant-btn a").eq(0).click(function(){
	if(bool)
	{	
		bool=false;
		var ulw=$(".merchant-middle-list:first").width();
		$(".merchant-middle-list:last").prependTo(".merchant-middle-img").css({"margin-left":-ulw+"px"});
		
		$(".merchant-middle-list").eq(0).stop(false,true).animate({"margin-left":0+"px"},500,function(){
			bool=true;
		});
		
	}
});

});

app.controller('aboutke',function($scope){
	address();
});

app.controller('solution',function($scope){
	address();

});
app.controller('case',function($scope){
	address();

});
app.controller('channel',function($scope){
	address();
	//渠道代理
	//切换
	$(".channel-middle-blue a").click(function(){
		$(".channelfoot-blue").show();
		$(".channelfoot-green").hide();
	})
	$(".channel-middle-green a").click(function(){
		$(".channelfoot-blue").hide();
		$(".channelfoot-green").show();
	})
	
	//注册页的地区
	
	//模拟下拉菜单
	$(".js_select").mouseenter(function(){
		$(this).children("ul").show();
			
		});
	$(".js_select").mouseleave(function(){
		$(this).children("ul").hide();
		
	});
	
	$("body").on("click",".js_select ul a",function(){
		var parentObj=$(this).parents(".js_select");
		var oldval=parentObj.children("input").val();//得到input里的旧的值
		var text=$(this).text();
		
		var val=$(this).data('val');
		//console.log(text,val,oldval);
		parentObj.children("input").val(val);
		parentObj.children(".agent_text").text(text);
		parentObj.children("ul").hide();
		if(oldval!=val)//旧的值跟新的值是否一样，如果一样就不进入触发change事件
		{
			
			parentObj.children("input").change();//值改变了，触发change
		}
		
	})




	//（2级联动）
	//捕获错误 http://www.w3school.com.cn/js/js_errors.asp
	/*try
	{
	   //在此运行代码
	}
	catch(err)
	{
	   //在此处理错误
	}
	*/
	try{//捕获错误
		function locationObj(json,Obj,clearHtml){
			
			Obj.html(clearHtml);//每次进入清空对象
			var frag=document.createDocumentFragment();//创建碎片（js创建方法，所以用jquery的时候就要加$(frag)）
			$.map(json,function(val,key){
				var lis=$("<li><a href='javascript:void(0)'data-val="+key+">"+val+"</a></li>");//创建标签并设置属性跟属性值
				$(frag).append(lis);//把lis插入到碎片中（即内存中）
			});
			
			Obj.append(frag);
			
		}
		locationObj(locationData['province'],$(".js_select ul").eq(0),"<li><a href='javascript:void(0)'data-val=0>请选择省份</a></li>");//调用函数
		
		$(".js_select input").eq(0).change(function(){
			$(".js_select .agent_text").eq(1).html("请选择城市");//清空第二个ul
			
			var val=$(this).val();
				//console.log($(this).val());
				if(val!=0)//如果val！=0（省份没有选择了“请选择省份”）进入
				{
					locationObj(locationData['city'][val],$(".js_select ul").eq(1),"<li><a href='javascript:void(0)'data-val=0>请选择城市</a></li>");
				}
				else//如果省份选择了请选择省份，把第二个ul清空
				{
					$(".js_select ul").eq(1).html('');
				}
		});
	}
	catch(err){
		
	}
});








