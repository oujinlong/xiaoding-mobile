;(function (window, document) {
    var _plugin_api={
        onLoad: function (settings) {
            // url参数中可以获取到gdt_vid、weixinadinfo参数值
            var gdt_vid = settings.gdt_vid;
            var url = window.location.href;
            console.log(gdt_vid,url);
            $.ajax({
                url: 'js/ceshi.php',
                timeout: 5000,
                type: 'post',
                data: {'gdt_vid':gdt_vid,'url':url},
                success: function (data) {
                    console.log(111);
                }
            });
        },
        /**
         * 获取请求参数数组
         * @returns {{}}
         */
        getQueryStrs: function () {
            var qs = location.search.substr(1), // 获取url中"?"符后的字串
                args = {}, // 保存参数数据的对象
                items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
                item = null,
                len = items.length;
            for (var i = 0; i < len; i++) {
                item = items[i].split("=");
                var name = decodeURIComponent(item[0]),
                    value = decodeURIComponent(item[1]);
                if (name) {
                    args[name] = value;
                }
            }
            return args;
        }
    };
    this.wechat = _plugin_api;

})(window, document);




