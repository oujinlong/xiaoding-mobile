document.writeln('<script src="http://cdn.bootcss.com/layer/3.0.1/layer.js"></script>');
document.writeln('<script src="http://dgg.dggdk.com/public/api/verify.js"></script>');
document.writeln('<link href="http://dgg.dggdk.com/public/api/verify.css" rel="stylesheet" />');

/*-----------------------------------*\
 留言功能
 \*-----------------------------------*/
var code_status = 0;
var code_status_1 = 0;
var img_code_status = false;
var img_code_status_1 = false;
$(function () {
    $("#code").click(function () {
        GetCode();
        $("#verify").focus();

    });
    //点击图片更换验证码
    $("#code1").click(function () {
        GetCode1();
        $("#verify1").focus();
    });
})

function GetCode() {
    if ($('#tel').val() == '') {
        layer.tips('请输入您的电话','#tel',{tips:3});
        return;
    }
    $("#code").attr("src", "http://dgg.dggdk.com/index.php/home/Index/verify?phone=" + $('#tel').val()+"&num="+Math.random());
}
function GetCode1() {
    if ($('#tel1').val() == '') {
        layer.tips('请输入您的电话','#tel1',{tips:3});
        return;
    }
    $("#code1").attr("src", "http://dgg.dggdk.com/index.php/home/Index/verify?phone=" + $('#tel1').val()+"&num="+Math.random());
}
/*
 *direction：1、2、3、4 对应上右下左
 *tips：提示内容
 *
 */
function validator_msg(attr, bool) {
    var default_options = {
        'name': {'direction': 3, 'tips': '请输入您的姓名'},
        'tel': {'direction': 3, 'tips': '请输入您的电话'},
        'sex': {'direction': 3, 'tips': '请选择性别'},
        'content': {'direction': 3, 'tips': '请输入你的内容'},
    };
    var v_name = $(attr + " input[name='info[name]']");
    var v_tel = $(attr + " input[name='info[tel]']");
    var v_content = $(attr + " input[name='info[content]']");    var v_textarea_content = $(attr + " textarea[name='info[content]']");
    var v_name_direction, v_name_tips, v_tel_direction, v_tel_tips, v_content_direction, v_content_tips;

    if (!/^[\u4e00-\u9fa5]{1,}$/.test(v_name.val())) {

        if (typeof(v_name.attr('direction')) == 'undefined' || v_name.attr('direction') == '') {
            v_name_direction = default_options.name.direction;
        } else {
            v_name_direction = v_name.attr('direction');
        }

        if (typeof(v_name.attr('tips')) == 'undefined' || v_name.attr('tips') == '') {
            v_name_tips = default_options.name.tips;
        } else {
            v_name_tips = v_name.attr('tips');
        }
        layer.tips(v_name_tips, v_name, {tips: v_name_direction});
        return 0;
    }

    if(typeof(v_textarea_content.val()) != 'undefined'){
        if(!/^[\u4e00-\u9fa5]{1,}$/.test(v_textarea_content.val()) && !/^[1-9]\d*$/.test(v_textarea_content.val())){
    
            if( typeof(v_textarea_content.attr('tips'))=='undefined' || v_textarea_content.attr('tips')=='' ){
                v_content_tips = default_options.content.tips;
            }else{
                v_content_tips = v_textarea_content.attr('tips');
            }
            layer.tips(v_content_tips, v_textarea_content ,{tips:v_content_direction} );
            return 0;
        }
    }	//if(typeof(v_content.val()) != 'undefined'){    //    if(!/^[\u4e00-\u9fa5]{1,}$/.test(v_content.val()) && !/^[1-9]\d*$/.test(v_content.val())){    //        if( typeof(v_content.attr('direction'))=='undefined' || v_content.attr('direction')=='' ){    //            v_content_direction = default_options.content.direction;    //        }else{    //            v_content_direction = v_content.attr('direction');    //        }    //    //        if( typeof(v_content.attr('tips'))=='undefined' || v_content.attr('tips')=='' ){    //            v_content_tips = default_options.content.tips;    //        }else{    //            v_content_tips = v_content.attr('tips');    //        }    //        layer.tips(v_content_tips, v_content ,{tips:v_content_direction} );    //        return 0;    //    }    //}

    if (!/^(1)[3,4,5,7,8][0-9]{9}$/.test(v_tel.val())) {
        if (typeof(v_tel.attr('direction')) == 'undefined' || v_tel.attr('direction') == '') {
            v_tel_direction = default_options.tel.direction;
        } else {
            v_tel_direction = v_tel.attr('direction');
        }

        if (typeof(v_tel.attr('tips')) == 'undefined' || v_tel.attr('tips') == '') {
            v_tel_tips = default_options.tel.tips;
        } else {
            v_tel_tips = v_tel.attr('tips');
        }
        layer.tips(v_tel_tips, v_tel, {tips: v_tel_direction});
        return 0;
    }
    return 1;

}

function CheckCode() {
    var code = $('#verify').val();
    var mobile = $('#tel').val();
    $.ajax({
        url: 'http://dgg.dggdk.com/index.php/home/Index/code_1',
        type: 'post',
        data: {mobile: mobile, code: code},
        dataType: 'JSONP',
        jsonp: 'callback',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            if (data.code == 1) {
                img_code_status = true;
            } else {
                GetCode();
                layer.msg(data.msg);
            }
        },
        error: function (data) {
            alert(111);
        }

    });

}

/*
 *提交信息
 *attr:包裹层属性
 *str: 业态|地区|设备|平台 如：工商|成都|移动端|小顶网 => gs|cd|wap|xdw     xdw=>小顶网  dgg=>小顶
 *info:弹出消息框的内容,已设置默认值，传入该参数则表示自定义弹出消息
 *info:为1时则不弹出消息框 submit_msg(attr,str,1)
 *调用示例：
 * onclick="submit_msg('#id','gs|cd|wap|xdw')"
 * onclick="submit_msg('.className','gs|cd|wap|xdw')"
 * onclick="submit_msg('[attr=value]','gs|cd|wap|xdw')"
 */
function submit_msg(attr, str, info) {
    //初始检测对象是否存在
    if ($(attr).length <= 0) {
        layer.msg('参数错误：对象不存在');
        return false;
    }

    //检测是否存在多个ID、class及属性
    if (attr.indexOf('#') > -1) {
        var idStr = attr.substring(attr.indexOf('#') + 1);
        if ($('[id=' + idStr + ']').length > 1) {
            layer.msg('参数错误：存在相同ID');
            return false;
        }
    } else {
        if ($(attr).length > 1) {
            layer.msg('参数错误：存在相同CLASS或属性');
            return false;
        }
    }

    if (validator_msg(attr, 1)) {

        var name = $(attr + " input[name='info[name]']").val();
        var tel = $(attr + " input[name='info[tel]']").val();
        var sex = $(attr + " input[name='info[sex]']:checked").val();
        var code = $(attr + " input[name='code']").val();
        if (typeof(sex) == 'undefined') {
            sex = '';
        }
        var content = $(attr + " input[name='info[content]']").val();        var textarea_content = $(attr + " textarea[name='info[content]']").val();		
		if (typeof(textarea_content) == 'undefined') {            textarea_content = '';        }				if (typeof(content) == 'undefined') {
            content = '';
        }else{			content += ' ；';		}		content += textarea_content;

        var strObj = str.split("|");
        var msgData = {
            "name": name + sex,
            "tel": tel,
            "content": content,
            "type": strObj[0],
            "place": strObj[1],
            "device": strObj[2],
            "web": strObj[3],
            "code": code
        };

        $.ajax({
            //url: 'http://172.16.1.6:8085/api/consult/add.do',
            //url: 'http://admin.dggjqw.com/api/consult/add.do',
            url: 'http://dgg.dggdk.com/index.php/home/Index/sendFormData',
            timeout: 5000,
            type: 'get',
            data: msgData,
            dataType: 'JSONP',
            jsonp: 'callback',
            success: function (data) {
                if (data.code == 0) {
                    layer.msg(data.msg);
                    $(attr + " input[type='text']").val('');
                    $(attr + " input[type='tel']").val('');
                    $(attr + " input[type='number']").val('');
                    $(attr + " #code").attr('src',"http://dgg.dggdk.com/Public_tp/images/code_img.png");
                    $(attr + " #code1").attr('src',"http://dgg.dggdk.com/Public_tp/images/code_img.png");
                } else {
                    layer.msg(data.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.msg('暂时不能留言，请在线或者电话咨询，敬请谅解！');
            }

        });
        return true;
    }
    /*if (code_status != 0||code_status_1 != 0) {}else{
     layer.msg('请完成验证');
     return false
     }*/

}

function getIP(content, json) {
    $.ajax({
        url: 'http://dgg.dggdk.com/public/message/obtainIP.php',
        timeout: 5000,//	设置请求超时时间（毫秒）。此设置将覆盖全局设置。
        type: 'get',
        async: false,
        success: function (data) {
            var res = JSON.parse(data);
            var str = {
                "provinces": res.region,
                "city": res.city,
                '查询商标': content
            };
            var obj = JSON.stringify(str);
            $(json).val(obj);
        }
    })
}


function submit_msg_copy(attr, str, info) {
    if (code_status != 0 || code_status_1 != 0) {
    } else {
        layer.msg('请完成验证');
        return false
    }
    //初始检测对象是否存在
    if ($(attr).length <= 0) {
        layer.msg('参数错误：对象不存在');
        return false;
    }

    //检测是否存在多个ID、class及属性
    if (attr.indexOf('#') > -1) {
        var idStr = attr.substring(attr.indexOf('#') + 1);
        if ($('[id=' + idStr + ']').length > 1) {
            layer.msg('参数错误：存在相同ID');
            return false;
        }
    } else {
        if ($(attr).length > 1) {
            layer.msg('参数错误：存在相同CLASS或属性');
            return false;
        }
    }
    var info = info || '您的信息已提交成功';
    if (validator_msg(attr, 1)) {

        var name = $(attr + " input[name='info[name]']").val();
        var tel = $(attr + " input[name='info[tel]']").val();
        var sex = $(attr + " input[name='info[sex]']:checked").val();
        if (typeof(sex) == 'undefined') {
            sex = '';
        }
        var content = $(attr + " input[name='info[content]']").val();
        if (typeof(content) == 'undefined') {
            content = '无内容信息';
        }

        var strObj = str.split("|");
        var msgData = {
            "name": name + sex,
            "tel": tel,
            "content": content,
            "type": strObj[0],
            "place": strObj[1],
            "device": strObj[2],
            "web": strObj[3]
        };

        $.ajax({
            //url: 'http://172.16.1.6:8085/api/consult/add.do',
            url: 'http://admin.dggjqw.com/api/consult/add.do',
            timeout: 5000,
            type: 'get',
            data: msgData,
            dataType: 'JSONP',
            jsonp: 'callback',
            success: function (data) {
                $(attr + " input[name='info[name]']:not(:hidden)").val('');
                $(attr + " input[name='info[tel]']").val('');
                if (!data.error) {
                    if (info && info != 1) {
                        layer.msg(info);
                    }

                } else {
                    layer.msg(data.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.msg('暂时不能留言，请在线或者电话咨询，敬请谅解！');
            }

        });
        return true;
    }
}


