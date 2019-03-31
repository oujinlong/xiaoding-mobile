/**
 *author: yjc
 *time: 2017.8.30
*/
(function autoSize(options){
    var defaults = {
            setup: '100*750'
        },
        opts = $.extend(true, {}, defaults, options),
        str = opts.setup.split('*'),
        size = str[0],
        Windth = str[1];
    var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function (){
            var clientWidth = docEl.clientWidth;
            if(!clientWidth) return;
            if(clientWidth >= Windth){
                docEl.style.fontSize = size + 'px';
            } else {
                docEl.style.fontSize = size * (clientWidth / Windth) + 'px';
            }
        };
    if(!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
})({setup: document.getElementsByTagName("html")[0].dataset.layout});
console.log(document.getElementsByTagName("html")[0].dataset);