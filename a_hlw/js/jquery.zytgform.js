document.writeln('<script src="http://cdn.bootcss.com/layer/3.0.1/layer.js"></script>');

$.fn.loadForm = function (options, changeHandle) {
    var jsessionid = '';

    if ($.isFunction(options)) {
        changeHandle = options;
        options = undefined;
    }

    $.fn.loadForm.defaults = {
        'codeImgDomain': 'http://admin.dggjqw.com/',//加载图形验证码地址
        'submitUrl': 'http://admin.dggjqw.com/api/consult/add1.do',//留言地址
        'imgCodeUrl': 'http://admin.dggjqw.com/get_imgcode.do',//请求图形验证码地址
        'sendSmsUrl1': 'http://admin.dggjqw.com/api/get_sms_code.do',//需要图形验证码的短信
        'sendSmsUrl2': 'http://admin.dggjqw.com/api/get_sms_code2.do',//不需要图形验证的短信
        'type': 'dk',
        'place': 'cd',
        'device': 'pc',
        'web': 'zytg'
    };

    var opts = $.extend({}, $.fn.loadForm.defaults, options);

    /*
    * 表单提交验证
    */
    var submitForm = function ($form) {
        var cityData = [
            {"id": "cd", "name": "成都"},
            {"id": "bj", "name": "北京"},
            {"id": "sz", "name": "深圳"},
            {"id": "gz", "name": "广州"},
            {"id": "wh", "name": "武汉"},
            {"id": "cq", "name": "重庆"},
            {"id": "hz", "name": "杭州"},
            {"id": "zz", "name": "郑州"},
            {"id": "yc", "name": "宜昌"},
            {"id": "fs", "name": "佛山"},
            {"id": "sjz", "name": "石家庄"},
        ];

        var $city = $this.find('select[name="city"]');
        var $contentSelect = $this.find('select[name="content"]');
        var $contentDiv = $this.find('div[name="content"]');
        var $contentInput = $this.find('input[name="content"]');
        var $contentTextarea = $this.find('textarea[name="content"]');
        var $name = $this.find('input[name="name"]');
        var $tel = $this.find('input[name="tel"]');
        var $msgCode = $this.find('input[name="msgCode"]');
        var cityVal = 'cd';
        var contentVal = '';

        //检测城市
        if ($city.length > 0) {
            var cityCheck = false;
            $.each(cityData, function (key, ele) {
                if ($city.val() == ele.name) {
                    cityCheck = true;
                    cityVal = ele.id;
                }
            });

            if (!cityCheck) {
                layer.tips("请选择城市", $city, {tips: 1});
                return false;
            }
            opts.place = cityVal;
        }


        //检测业务类型-Div
        if ($contentDiv.length > 0) {
            if ($contentDiv.find('a.selected').attr('value') == '1') {
                var contentDivTips = '请输入正确的业务';
                if ($contentDiv.attr("tips")) {
                    contentDivTips = $contentDiv.attr("tips");
                }
                layer.tips(contentDivTips, '.dummy', {tips: 1});
                return false;
            }
            contentVal += $contentDiv.find('a.selected').text();
        }


        //检测业务类型-select
        if ($contentSelect.length > 0) {
            if ($contentSelect.val() == '') {
                var contentSelectTips = '请输入正确的业务';
                if ($contentSelect.attr("tips")) {
                    contentSelectTips = $contentSelect.attr("tips");
                }
                layer.tips(contentSelectTips, $contentSelect, {tips: 1});
                return false;
            }
            contentVal += $contentSelect.val();
        }

        //检测业务类型-input
        if ($contentInput.length > 0) {
            if ($contentInput.val() == '') {
                var contentInputTips = '请输入正确的业务';
                if ($contentInput.attr("tips")) {
                    contentInputTips = $contentInput.attr("tips");
                }
                layer.tips(contentInputTips, $contentInput, {tips: 1});
                return false;
            }
            contentVal += $contentInput.val()
        }

        //检测业务类型-textarea
        if ($contentTextarea.length > 0) {
            if ($contentTextarea.val() == '') {
                var contentTextareaTips = '请输入正确的业务';
                if ($contentTextarea.attr("tips")) {
                    contentTextareaTips = $contentTextarea.attr("tips");
                }
                layer.tips(contentTextareaTips, $contentTextarea, {tips: 1});
                return false;
            }
            contentVal += $contentTextarea.val();
        }

        if (!/^[\u4e00-\u9fa5]{1,30}$/.test($name.val())) {
            var nameTips = '请输入正确的姓名';
            if ($name.attr("tips")) {
                nameTips = $name.attr("tips");
            }
            layer.tips(nameTips, $name, {tips: 1});
            return false;
        }

        if (!/^(1)[3,4,5,6,7,8,9][0-9]{9}$/.test($tel.val())) {
            layer.tips("请输入正确的手机号码", $tel, {tips: 1});
            return false;
        }

        if ($msgCode.val() == '') {
            layer.tips("请输入短信验证码", $msgCode, {tips: 1});
            return false;
        }

        var tel=$tel.val();
        var msgData = {
            "name": $name.val(),
            "tel": tel,
            "content": contentVal,
            "type": opts.type,
            "place": opts.place,
            "device": opts.device,
            "web": opts.web,
            "smsCode": $msgCode.val()
        };

        $.ajax({
            url: opts.submitUrl + jsessionid,
            timeout: 5000,
            type: 'post',
            data: msgData,
            dataType: 'JSONP',
            xhrFields: {withCredentials: true},
            jsonp: "callback",
            jsonpCallback: "flightHandler",
            success: function (data) {
                layer.msg(data.msg);
                if (data.error == 0) {
                    layer.msg('提交成功，稍后请注意接听电话');
                    $form[0].reset();
                    $('#dummydata').attr('tips','请选择您所在的区域');
                    if (typeof changeHandle === 'function') {
                        changeHandle(tel);
                    }
                }
            }
        });
    };

    /*
   * 发送短信验证码倒计时
   */
    function countDown(countdown, timeoutFun, $getSmsCodeBtn) {
        var disableTime = function () {
            if (countdown <= 0) {
                console.info(countdown);
                $getSmsCodeBtn.removeClass("disabled").removeAttr("disabled");
                $getSmsCodeBtn.text("重新发送");
                clearTimeout(timeoutFun);
                return;
            } else {
                $getSmsCodeBtn.text("重新发送(" + countdown + ")");
                $getSmsCodeBtn.addClass("disabled").attr("disabled", "true");
                countdown--;
            }
            timeoutFun = setTimeout(disableTime, 1000);
        };
        disableTime();

    }


    return this.each(function () {
        $this = $(this);
        var $picCodeImg = $this.find('img[name="picCodeImg"]');
        var $getSmsCodeBtn = $this.find('button[name="getSmsCodeBtn"]');
        $.ajax({
            type: "post",
            url: opts.imgCodeUrl,
            dataType: "jsonp",
            xhrFields: {
                withCredentials: true
            },
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonpCallback: "flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
            success: function (json) {
                $this.find($picCodeImg).attr('src', opts.codeImgDomain + json.img);
                jsessionid = ";jsessionid=" + json.jsid;

            }
        });

        //刷新图形验证码
        $this.find($picCodeImg).click(function () {
            var src = $(this).attr('src');
            var index = src.indexOf('?');
            if (index > 0) {
                src = src.substring(0, index);
            }
            $(this).attr('src', src + "?" + Math.random());
        });

        $this.find($getSmsCodeBtn).click(function () {
            var $picCode = $this.find('input[name="picCode"]');
            var $tel = $this.find('input[name="tel"]');
            var tel = $tel.val();
            var countdown = 60;
            var timeoutFun;
            if ($picCode.length == 0) {
                if (!/^(1)[3,4,5,6,7,8,9][0-9]{9}$/.test(tel)) {
                    layer.tips("请输入正确的手机号码", $tel, {tips: 1});
                    return false;
                }
                $.ajax({
                    url: opts.sendSmsUrl2 + jsessionid,
                    timeout: 5000,
                    type: 'post',
                    data: {'tel': tel},
                    dataType: 'JSONP',
                    xhrFields: {withCredentials: true},
                    jsonp: "callback",
                    jsonpCallback: "flightHandler",
                    success: function (json) {
                        layer.msg(json.msg);
                        if (json.error == 0) {
                            layer.msg(json.msg);
                            countDown(countdown, timeoutFun, $getSmsCodeBtn);
                        }
                    }
                });
            } else {
                var picCode = $picCode.val();
                if (picCode.length == 0) {
                    layer.tips("请输入图形验证码", $picCode, {tips: 1});
                    return false;
                }
                if (!/^(1)[3,4,5,6,7,8,9][0-9]{9}$/.test(tel)) {
                    layer.tips("请输入正确的手机号码", $tel, {tips: 1});
                    return false;
                }
                $.ajax({
                    url: opts.sendSmsUrl1 + jsessionid,
                    timeout: 5000,
                    type: 'get',
                    data: {'tel': tel, 'code': picCode},
                    dataType: 'JSONP',
                    xhrFields: {withCredentials: true},
                    jsonp: "callback",
                    jsonpCallback: "flightHandler",
                    success: function (json) {
                        layer.msg(json.msg);
                        if (json.error == 0) {
                            layer.msg(json.msg);
                            countDown(countdown, timeoutFun, $getSmsCodeBtn);
                        }
                    }
                });
            }
        });

        $this.submit(function (e) {
            e.preventDefault();
            submitForm($(this));
        });

    });

};