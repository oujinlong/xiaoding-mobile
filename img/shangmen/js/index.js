/**
 * Created by Administrator on 2017/11/23.
 */
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