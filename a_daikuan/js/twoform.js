//	twoform 表单样式
    $(".room label").click(function(){
        $(".room label").removeClass("active-label");
        $(this).addClass("active-label")
    });
    $(".car label").click(function(){
        $(".car label").removeClass("active-label");
        $(this).addClass("active-label")
    });
    $(".policy label").click(function(){
        $(".policy label").removeClass("active-label");
        $(this).addClass("active-label")
    });
    $(".Social label").click(function(){
        $(".Social label").removeClass("active-label");
        $(this).addClass("active-label")
    });
    $(".credit label").click(function(){
        $(".credit label").removeClass("active-label");
        $(this).addClass("active-label")
    });
    $(".wages label").click(function(){
        $(".wages label").removeClass("active-label");
        $(this).addClass("active-label")
    });
    $(".Particle label").click(function(){
        $(".Particle label").removeClass("active-label");
        $(this).addClass("active-label")
    });
    $(".fund label").click(function(){
        $(".fund label").removeClass("active-label");
        $(this).addClass("active-label")
    }) ;
    

    $(".fund label").click(function(){
        $(".fund label").removeClass("active-label");
        $(this).addClass("active-label")
    });

    $(".form-last label").click(function(){
        $(".form-last label").removeClass("active-label-mark");
        $(this).addClass("active-label-mark");
        $(".markInput").css("display","inline-block")
    })
 ;   
(function(){
	function formStyle(opt){
		opt=opt||{};
		opt.color=opt.color||"#e3b722";
		opt.banner=opt.banner||"yellow";
//		表单显示
		$(".more-info-form").css("display","block")
        //改变active  和  按钮  input得到焦点的颜色
        $("head").append(
            ` <style>
            .form-group1 .active-label{
                background: ${opt.color};
            }
            .form-group1 input:focus{
                border: 1px solid ${opt.color}
            }
            .form-group1 label{
                border: 1px solid ${opt.color};
            }
            .apply button{
                background: ${opt.color};
            }
	    </style>  `
        )
        //banner
		$('#banner-old').hide();
		$('#two-banner').show();
        switch (opt.banner){
            case "orange":
                $('#two-banner img').attr("src","twoform/orange-banner.jpg");
                break;
            case "yellow":
                $('#two-banner img').attr("src","twoform/yellow-banner.jpg");
                break;
            case "blue":
                $('#two-banner img').attr("src","twoform/blue-banner.jpg");
                break;
            case "red":
                $('#two-banner img').attr("src","twoform/red-banner.jpg");
                break;
            case "purple":
                $('#two-banner img').attr("src","twoform/purple-banner.jpg");
                break;
                default:
                "您传的banner格式不正确"
        }
		$('#two1').show();
	}
	window.formStyle=formStyle
})();
