/**
 * Created by Administrator on 2017/11/23.
 */
/**
 * Created by admin on 2017/11/27.
 */
//tab 切换

(function(){
    var Tabs = function(ele,opt){
        this.$element=ele,
            defaults = {
                outBox:'',//最外层div类名
                tabTitle:'',//操作tab层
                content:'',//切换tab外出
                checkStyle:'active',//tab选中样式类名
                eve:'click'//触发事件,只有click与hover这两个参数
            }
        this.options=$.extend({}, defaults,opt)
    };
    Tabs.prototype = {
        start:function(){
            var outBox=$(this.$element).selector,
                content=this.options.content,
                tabTitle=this.options.tabTitle,
                eve=this.options.eve,
                checkStyle=this.options.checkStyle;
            $(this.$element).each(function(){
                var i=0;
                var ishas=$(this).children(tabTitle).children().hasClass(checkStyle);
                $(this).children(tabTitle).children().each(function(){
                    if(ishas) {
                        if($(this).hasClass(checkStyle)==true) {
                            $(this).parent().parent(outBox).find(content).children().hide();
                            $(this).parent().parent(outBox).find(content).children().eq(i).show();
                        }
                    }else{
                        $(this).parent().children().eq(0).addClass(checkStyle);
                        $(this).parent().parent(outBox).find(content).children().hide();
                        $(this).parent().parent(outBox).find(content).children().eq(0).show();
                    }
                    $(this).attr('data-num',i);
                    i++;
                });
            });
            if(eve=="hover") {
                $(this.$element).children(tabTitle).children().hover(function(){
                    var opt_num=$(this).attr('data-num');
                    $(this).parent().parent(outBox).children(content).children().hide();
                    $(this).parent().parent(outBox).children(content).children().eq(opt_num).show();
                    $(this).parent().children().removeClass(checkStyle);
                    $(this).addClass(checkStyle);
                });
            }
            else if(eve=="click") {
                $(this.$element).children(tabTitle).children().click(function(){
                    var opt_num=$(this).attr('data-num');
                    $(this).parent().parent(outBox).children(content).children().hide();
                    $(this).parent().parent(outBox).children(content).children().eq(opt_num).show();
                    $(this).parent().children().removeClass(checkStyle);
                    $(this).addClass(checkStyle);
                });
            }
        }
    };
    $.fn.myTab = function(options) {
        var tabs = new Tabs(this,options);
        return tabs.start();
    };
})();

window.onload=function(){
    //var swiper = new Swiper('.swiper-container', {
    //    spaceBetween: 30,
    //    centeredSlides: true,
    //    autoplay:2500,
    //    //direction: 'vertical',
    //    loop: true,
    //    pagination: {
    //        el: '.swiper-pagination',
    //        clickable: true
    //    },
    //    navigation: {
    //        nextEl: '.swiper-button-next',
    //        prevEl: '.swiper-button-prev'
    //    }
    //});
    // var swiper = new Swiper('.swiper-container', {
    //     effect: 'cube',
    //     grabCursor: true,
    //     cubeEffect: {
    //         shadow: true,
    //         slideShadows: true,
    //         shadowOffset: 20,
    //         shadowScale: 0.94,
    //     },
    //     pagination: {
    //         el: '.swiper-pagination',
    //     },
    // });
    var banner_length = $('.banner .swiper-slide').length;
    if(banner_length > 1) {
        var mySwiper1 = new Swiper('.banner', {
            loop: true,
            autoplay: 3000,
            autoplayDisableOnInteraction: false, //滑动后自动播放不会禁止
            pagination: ".banner-pagination"
        });
    }else{
        $('.banner .banner-pagination').hide();
    }
}