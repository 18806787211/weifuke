//导航
function navMove(obj){
	var liw=obj.outerWidth();
	var lileft=obj.position().left;
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
var app=angular.module("myApp",["ngRoute"]);


//应用的路由配置
app.templatePath="template/";
app.config(['$routeProvider',"$httpProvider",function($route){
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
	var Flash={};
	$(".flash-bottom a").click(function(){
	
		if($(this).hasClass("colorA"))
		{
			return;
		}
		clearTimeout(Flash.Do);
		var nowPos=$(this).index();
		var oldPos=$(".colorA").index(".flash-bottom a");
		$(this).addClass("colorA").siblings(".colorA").removeClass();
		$(".flash-middle li").eq(nowPos).stop(false,true).fadeIn(2000);
		$(".flash-middle li").eq(oldPos).stop(false,true).fadeOut(2000);
			
		eval("Flash.Out"+oldPos+"("+oldPos+","+nowPos+")");
		Flash.Do=setTimeout(function(){
			eval("Flash.In"+nowPos+"("+nowPos+","+oldPos+")");
		},800);
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
	
	
	Flash.In1=function(oldPos,nowPos){
			if(oldPos<nowPos)
			{
				$(".slidetwo1,.slidetwo2,.slidetwo3").css({"left":"-2000px"})
			}
			else
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
		
		if(oldPos<nowPos)
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
	
	
	Flash.Move=function(){
		var oldPos,nowPos,lastPos;
		oldPos=$(".colorA").index(".flash-bottom a");
		lastPos=$(".flash-bottom a").length-1;
		nowPos=oldPos==lastPos?0:oldPos+1;
		$(".flash-bottom a").eq(oldPos).removeClass("colorA");
		$(".flash-bottom a").eq(nowPos).addClass("colorA");
		$(".flash-middle li").eq(nowPos).stop(false,true).fadeIn(2000);
		$(".flash-middle li").eq(oldPos).stop(false,true).fadeOut(2000);
		eval("Flash.Out"+oldPos+"("+oldPos+","+nowPos+")");
		Flash.Do=setTimeout(function(){
			eval("Flash.In"+nowPos+"("+nowPos+","+oldPos+")");
		},800);
	}
	
	Flash.Auto=window.setInterval(function(){
		if(window.location.hash!="#/")
		{
			
			window.clearInterval(Flash.Auto);
			Flash=null;
			return;
		}
		 Flash.Move();
	},6000);
	$(".flashBT").mouseenter(function(){
		clearInterval(Flash.Auto);
	});
	$(".flashBT").mouseleave(function(){
		Flash.Auto=window.setInterval(function(){
			if(window.location.hash!="#/")
			{
				
				window.clearInterval(Flash.Auto);
				Flash=null;
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
		var oldval=parentObj.children("input").val();
		var text=$(this).text();
		
		var val=$(this).data('val');
		//console.log(text,val,oldval);
		parentObj.children("input").val(val);
		parentObj.children(".agent_text").text(text);
		parentObj.children("ul").hide();
		if(oldval!=val)
		{
			
			parentObj.children("input").change();
		}
		
	})





	}
	*/
	try{//捕获错误
		function locationObj(json,Obj,clearHtml){
			
			Obj.html(clearHtml);//每次进入清空对象
			var frag=document.createDocumentFragment();
			$.map(json,function(val,key){
				var lis=$("<li><a href='javascript:void(0)'data-val="+key+">"+val+"</a></li>");
				$(frag).append(lis);
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








