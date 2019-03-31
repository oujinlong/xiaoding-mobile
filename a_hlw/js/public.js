(function(){
	//点击菜单，添加蒙版与显示菜单
    $(".more-menu").on("click",function(){
        $(".menu-toast,.close-layer").stop().fadeToggle(200);

        //$(".close-layer").stop().fadeToggle(200);
        if($(".menu-toast").css("display")=='block'){
            new_scrollTop = document.body.scrollTop;
            document.body.scrollTop = new_scrollTop;
            $("body,html").addClass("body_noscroll");
        }
    });
    $(".close-menu,.close-layer").on('click',function(){
        $(".menu-toast,.close-layer").stop().fadeToggle(200);
        $("body,html").removeClass("body_noscroll");
        document.body.scrollTop=new_scrollTop;//�رպ�����λ�õ�ֵ
    });

	//在body上添加蒙版
	var udfLayer='<div class="nav-layer"></div>'
		$("body").append(udfLayer);
	//菜单点击蒙版，收起菜单隐藏蒙版
	$(".nav-layer").on("click",function(){
		$(this).hide();
		$(".nav-menu").slideUp();
		$(".home-popup").fadeOut()
		$(".public-home").show();
		setTimeout(function(){
			$(".public-home").css("opacity","0.5")
		},5000);
	});

})(jQuery)

