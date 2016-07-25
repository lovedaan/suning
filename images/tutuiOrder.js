$(document).ready(function(){
    //得到在首页选择的城市
    if(sessionStorage.getItem("tutuiCity")){
        var cityName = sessionStorage.getItem("tutuiCity");
        $("#select1 option").each(function(i){
            if($(this).text() == cityName){
                $(this).prop("selected",true);
                return false;
            }
        });

        $("#select3 option").each(function(i){
            if($(this).attr("value") == cityName){
                $(this).prop("selected",true);
                return false;
            }
        });
    }

    //页面加载的时候循环所有文本框，在文本框的下一个节点动态生成一个节点
    $("input[type='text']").each(function(i){
        $(this).parent().css("position","relative");
        if($(this).attr("id") == "hphm"){
            $(this).after('<i class="input_close" style="right:200px"></i>');
        }else if($(this).attr("class") == "rightP"){
            $(this).after('<i class="input_close" style="right:56px"></i>');
        }
        else if($(this).attr("class") == "vCode"){
            $(this).after('<i class="input_close" style="right:77px"></i>');
        }
        else{
            $(this).after('<i class="input_close"></i>');
        }
    });

    //重新选择城市，车牌字母也跟着变
    $("#select1").on("change",function(){
        var cityname = $(this).val();
        $("#select3 option").each(function(i){
            if($(this).attr("value") == cityname){
                $(this).prop("selected",true);
                return false;
            }
        });
    });

    //选择车牌字母，城市也要跟着变
    $("#select3").on("change",function(){
        var cityname = $(this).val();
        $("#select1 option").each(function(i){
            if($(this).text() == cityname){
                $(this).prop("selected",true);
                return false;
            }
        });
    });
    //键盘弹起的时候把输入的字母转大写
    $("#hphm,#engine,#vin").keyup(function(){
        var Val = $(this).val();
        if(Val != ""){
            $(this).val(Val.toUpperCase());
        }
    });

    var VAL = "";
    //文本框得到焦点，清空文字
    $("#hphm,#vin,#engine,#name,#phone,.vCode,#email").focus(function(){
        VAL = "";
        VAL = $(this).val();
        $(this).css("color","#000");
        if(VAL == "请输入车牌号" || VAL == "请输入后六位" || VAL == "请输入后六位" ||VAL == "请输入姓名" || VAL == "请输入手机号码" || VAL == "请输入验证码" || VAL == "验证后可接收违章信息" ){
            $(this).val("");
            //$("i.input_close").hide();
            $(this).next("i.input_close").show();
        }else{
            $(this).next("i.input_close").show();
        }
    });
    //文本框是去焦点
    $("#hphm,#vin,#engine,#name,#phone,.vCode,#email").blur(function(){
        if($(this).val() == "" ){
            $(this).val(VAL);
            $(this).css("color","#ccc");
            $(this).next("i.input_close").hide();
            VAL = "";
        }else{
            //$("i.input_close").hide();
            $(this).next("i.input_close").show();
        }
    });
    //点击文本框的X可以清空文本
     $(".f_right").delegate("i.input_close","click",function(ev){
        ev.stopPropagation();
        $(this).hide();
        $(this).prev().val(VAL).css("color","#ccc");
    });

    //点击获取验证码
    $(".setCodeBtn").on("click",function(){

        var phone = $("#phone").val();
        if(phone != "" && phone != "请输入手机号码"){
            var para = {};
            para.webid = "243";
            para.name = "WZ";
            para.mobile = phone;
            para.type = "1";
            objAtt = '';
            server_mgw('DIAN-0101', para, objAtt, '');
        }
        else if(phone == "请输入手机号码"){
            showText("请输入正确手机号");
        }
    });

    //点击开通按钮
    $("#okBtn").on("click",function(){
        var hphm = $("#hphm").val();
        var engine = $("#engine").val();
        var vin = $("#vin").val();
        var name = $("#name").val();
        var phone = $("#phone").val();
        var vCode = $(".vCode").val();
        var email = $("#email").val();
        var re = /^\w+@[0-9a-z]+\.[a-z]+$/i;
        if(hphm == "" && hphm == "请输入车牌号"){
            showText("请输入正确的车牌号码");
        }
        else if(engine == "" && engine == "请输入后六位"){
            showText("请输入正确的发动机号");
        }
        else if(vin == "" && vin == "请输入后六位"){
            showText("请输入正确的车架号");
        }
        else if(name == "" && name == "请输入姓名"){
            showText("请输入正确姓名");
        }
        else if(phone == "" && phone == "请输入手机号码"){
            showText("请输入正确手机号");
        }
        else if(vCode == "" && vCode == "请输入验证码"){
            showText("请输入正确验证码");
        }
        else{
            var para = {};
            var arr = [];
            var json1 = {};
            var json2 = {};
            if(email != "" && email != "验证后可接收违章信息"){
                if(!re.test(email)){
                    showText("请输入正确的邮箱格式");
                }else{
                    para.email = email;
                    json2.email = email;
                }
            }
            para.name = "WZ";
            para.Two = "3";
            para.client = encodeURIComponent(name);          //姓名
            para.userid = "";                //用户编号
            para.mobile = phone;    //手机
            para.pay_type = "24";
            para.coupon = "";   //兑换码
            para.province = "";    //省份
            para.city = "";    //城市
            para.city_area = "";   //区域
            para.addr = "";   //地址
            para.postno = "";   //邮编
            para.post_fee = 0;   //快递费
            para.credit_charge = 0;   //网上支付手续费
            para.web_id = "243";   //站点编号
            para.memo = "";   //备注
            para.open_id = "";   //微信ID
            para.show_url = "http://www.163.cn/completed";
            json2.busi_fee = 0;
            json2.hphm = "粤"+$("#select3 option:selected").text() + hphm;  //车牌号码
            json2.mobile = phone;  //手机号码
            json2.vin = vin;   //车架号码
            json2.engine = engine;   //发动号码
            json2.hpzl = "02";   //  车型
            json2.sms_city = "020";
            json2.class_no = 588;
            json1.x_type = "25";
            json1.busi25 = json2;
            arr[0] = json1;
            para.busi_list = arr;
            para.total_fee = 0;
            objAtt = '';
            $("body").attr("data",JSON.stringify(para));
           server_mgw('CART-ORDER', para, objAtt, '');
        }

    });


});
