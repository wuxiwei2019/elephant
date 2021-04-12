
//右键菜单
jQuery(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        if(e.which==3){
            showMessage("秘密通道:<br />    <img src=\"https://files-cdn.cnblogs.com/files/aeolian/cat02.gif\"/><br/><a href=\"https://www.52zt.info\" title=\"秋夜雨巷\">秋夜雨巷</a>  ",10000);
        }
    });
    $("#spig").bind("contextmenu", function(e) {
        return false;
    });
});

//鼠标在消息上时
jQuery(document).ready(function ($) {
    $("#spig_message").hover(function () {
        $("#spig_message").fadeTo("100", 1);
    });
});


//鼠标在上方时
jQuery(document).ready(function ($) {
    //$(".mumu").jrumble({rangeX: 2,rangeY: 2,rangeRot: 1});
    $(".mumu").mouseover(function () {
        $(".mumu").fadeTo("300", 0.3);
        //,"<a target='_blank' href='https://s.click.taobao.com/8ZFMMqv'>别太累啦,来点<span style='color: blue;text-decoration: underline;'>养生茶</span>吧~</a>"
        //,"<a target='_blank' href='https://s.click.taobao.com/LOtLMqv'>经常熬夜,来点<span style='color: blue;text-decoration: underline;'>养肝茶</span>~</a>"
        //,"<a target='_blank' href='https://s.click.taobao.com/5p2KMqv'>官方旗舰店<span style='color: blue;text-decoration: underline;'>霸王洗发水</span>打折咯,不来一瓶?</a>"
        msgs = [
            "陪我聊天吧！", "…@……!………", "^%#&*!@*(&#)(!)(",
            "我可爱吧！嘻嘻!~^_^!~~","~\(≧▽≦)/~啦啦啦",
            "从前有座山，山上有座庙，庙里有个老和尚给小和尚讲故事，讲：“从前有座……”"
            , "我隐身了，你看不到我~"
            , "原谅我数学不好，说话不算数！"
            , "每天醒来的第一件事就是想睡觉~"
            , "跟我混吧 有我一口饭吃 就有你一个碗刷~"
            , "肚子饿了就打电话给我，我顺便吸一口面给你听~"
            , "可爱之人必有可胖之处！"
            , "我会隐身哦！嘿嘿！"
        ];
        var i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i]);
    });
    $(".mumu").mouseout(function () {
        $(".mumu").fadeTo("300", 1)
    });
});


//开始
jQuery(document).ready(function ($) {
    if (isindex) { //如果是主页
        var now = (new Date()).getHours();
        if (now > 0 && now <= 6) {
            showMessage(visitor + ' 你是夜猫子呀？还不睡觉，明天起的来么你？', 6000);
        } else if (now > 6 && now <= 11) {
            showMessage(visitor + ' 早上好，早起的鸟儿有虫吃噢！早起的虫儿被鸟吃，你是鸟儿还是虫儿？嘻嘻！', 6000);
        } else if (now > 11 && now <= 14) {
            showMessage(visitor + ' 中午了，吃饭了么？不要饿着了，饿死了谁来挺我呀！', 6000);
        } else if (now > 14 && now <= 18) {
            showMessage(visitor + ' 中午的时光真难熬！还好有你在！', 6000);
        } else {
            showMessage(visitor + ' 快来逗我玩吧！', 6000);
        }
    }else {
        showMessage('欢迎' + visitor + '来到《' + title + '》', 6000);
    }
    $(".spig").animate({
            top: $(".spig").offset().top + 300,
            left: document.body.offsetWidth - 185
        },
        {
            queue: false,
            duration: 1000
        });
    /*window.setTimeout(function () {
        showMessage("下面播报明日天气<iframe name=\"xidie\" src=\"http://api.lwl12.com/hitokoto/?encode=js\"frameborder=\“0\” scrolling=\"no\"  width=\"130px\" allowtransparency=\"true\" ></iframe>", 10000);
    },
  4000);*/
});

//鼠标在某些元素上方时
jQuery(document).ready(function ($) {
    $('h2 a').click(function () {//标题被点击时
        showMessage('萌萌地加载《<span style="color:#0099cc;">' + $(this).text() + '</span>》中，请稍候');
    });
    $('h2 a').mouseover(function () {
        showMessage('要看看《<span style="color:#0099cc;">' + $(this).text() + '</span>》这篇随笔么？');
    });
    $('#prev-page').mouseover(function(){
        showMessage('要翻到上一页吗?');
    });
    $('#nav_next_page').mouseover(function(){
        showMessage('要翻到下一页吗?');
    });
    $('#index-links li a').mouseover(function () {
        showMessage('去 <span style="color:#0099cc;">' + $(this).text() + '</span> 逛逛');
    });
    $('.comments').mouseover(function () {
        showMessage('<span style="color:#0099cc;">' + visitor + '</span> 向评论栏出发吧！');
    });
    $('#submit').mouseover(function () {
        showMessage('确认提交了么？');
    });
    $('#s').focus(function () {
        showMessage('输入你想搜索的关键词再按Enter(回车)键就可以搜索啦!');
    });
    $('#go-prev').mouseover(function () {
        showMessage('点它可以后退哦！');
    });
    $('#go-next').mouseover(function () {
        showMessage('点它可以前进哦！');
    });
    $('#refresh').mouseover(function () {
        showMessage('点它可以重新载入此页哦！');
    });
    $('#go-home').mouseover(function () {
        showMessage('点它就可以回到首页啦！');
    });
    $('#addfav').mouseover(function () {
        showMessage('点它可以把此页加入书签哦！');
    });
    $('#nav-two a').mouseover(function () {
        showMessage('嘘，从这里可以进入控制面板的哦！');
    });
    $('.post-category a').mouseover(function () {
        showMessage('点击查看此分类下得所有文章');
    });
    $('.post-heat a').mouseover(function () {
        showMessage('点它可以直接跳到评论列表处.');
    });
    $('#tho-shareto span a').mouseover(function () {
        showMessage('你知道吗?点它可以分享本文到'+$(this).attr('title'));
    });
    $('#switch-to-wap').mouseover(function(){
        showMessage('点击可以切换到手机版博客版面');
    });
});


//无聊讲点什么
jQuery(document).ready(function ($) {

    window.setInterval(function () {
        msgs = [ "陪我聊天吧！", "好无聊哦，你都不陪我玩！", "…@……!………", "^%#&*!@*(&#)(!)(", "我可爱吧！嘻嘻!~^_^!~~","~\(≧▽≦)/~啦啦啦","从前有座山，山上有座庙，庙里有个老和尚给小和尚讲故事，讲：“从前有座……”"];

        /*msgs = [ "陪我聊天吧！"
        ,"<a target='_blank' href='https://s.click.taobao.com/5p2KMqv'>官方旗舰店<span style='color: blue;text-decoration: underline;'>霸王洗发水</span>打折啦,不来一瓶?</a>"
        ];*/
        // msgs = ["<iframe src=\"http://api.lwl12.com/hitokoto\"frameborder=\"0\" scrolling=\"no\" id=\"test\" onload=\"this.height=50\"  width=\"130px\" allowtransparency=\"true\" ></iframe>"];
        //if(weather.state)msgs.push(weather.c[0],weather.c[2]);
        //msgs = [weather.c[0],weather.c[2],"<iframe src=\"http://api.myhloli.com/hitokoto/\" frameborder=\"0\" scrolling=\"no\" id=\"external-frame\"  height=\"70px\" width=\"150px\" allowtransparency=\"true\" ></iframe>","<iframe src=\"http://api.myhloli.com/hitokoto/\" frameborder=\"0\" scrolling=\"no\" id=\"external-frame\"  height=\"70px\" width=\"150px\" allowtransparency=\"true\" ></iframe>","<iframe src=\"http://api.myhloli.com/hitokoto/\" frameborder=\"0\" scrolling=\"no\" id=\"external-frame\"  height=\"70px\" width=\"150px\" allowtransparency=\"true\" ></iframe>"];
        //msgs = [$("#hitokoto").text()];
        var i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i], 8000);
    }, 15000);
});

//无聊动动
jQuery(document).ready(function ($) {
    window.setInterval(function () {
       // msgs = ["播报明日天气<iframe name=\"xidie\" src=\"http://m.weather.com.cn/data/101010100.html\"frameborder=\“0\” scrolling=\"no\" height=\"15px\"  width=\"130px\" allowtransparency=\"true\" ></iframe>", "乾坤大挪移！", "我飘过来了！~", "我飘过去了", "我得意地飘！~飘！~"];
       // msgs = ["<iframe src=\"http://api.lwl12.com/hitokoto\"frameborder=\"0\" scrolling=\"no\" id=\"test\" onload=\"this.height=50\"  width=\"140px\" allowtransparency=\"true\" ></iframe>"];
        // if(weather.state)msgs.push(weather.c[0],weather.c[2]);
         msgs = [weather.c[0],weather.c[2],"<iframe src=\"http://api.myhloli.com/hitokoto/\" frameborder=\"0\" scrolling=\"no\" id=\"external-frame\"  height=\"70px\" width=\"150px\" allowtransparency=\"true\" ></iframe>","<iframe src=\"http://api.myhloli.com/hitokoto/\" frameborder=\"0\" scrolling=\"no\" id=\"external-frame\"  height=\"70px\" width=\"150px\" allowtransparency=\"true\" ></iframe>","<iframe src=\"http://api.myhloli.com/hitokoto/\" frameborder=\"0\" scrolling=\"no\" id=\"external-frame\"  height=\"70px\" width=\"150px\" allowtransparency=\"true\" ></iframe>"];
        var i = Math.floor(Math.random() * msgs.length);
        s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6,0.7,0.75,-0.1, -0.2, -0.3, -0.4, -0.5, -0.6,-0.7,-0.75];
        var i1 = Math.floor(Math.random() * s.length);
        var i2 = Math.floor(Math.random() * s.length);
            $(".spig").animate({
            left: document.body.offsetWidth/2*(1+s[i1]),
            top:  document.body.offsetheight/2*(1+s[i1])
        },
            {
                duration: 2000,
                complete: showMessage(msgs[i])
            });
    }, 45000);
});

//评论资料
jQuery(document).ready(function ($) {
    $("#author").click(function () {
        showMessage("留下你的尊姓大名！");
        $(".spig").animate({
                top: $("#author").offset().top - 70,
                left: $("#author").offset().left - 170
            },
            {
                queue: false,
                duration: 1000
            });
    });
    $("#email").click(function () {
        showMessage("留下你的邮箱，不然就是无头像人士了！");
        $(".spig").animate({
                top: $("#email").offset().top - 70,
                left: $("#email").offset().left - 170
            },
            {
                queue: false,
                duration: 1000
            });
    });
    $("#url").click(function () {

        showMessage("快快告诉我你的家在哪里，好让我去参观参观！");
        $(".spig").animate({
                top: $("#url").offset().top - 70,
                left: $("#url").offset().left - 170
            },
            {
                queue: false,
                duration: 1000
            });
    });
    $("#comment").click(function () {
        showMessage("认真填写哦！不然会被认作垃圾评论的！我的乖乖~");
        $(".spig").animate({
                top: $("#comment").offset().top - 70,
                left: $("#comment").offset().left - 170
            },
            {
                queue: false,
                duration: 1000
            });
    });
});

var spig_top = 50;
//滚动条移动
jQuery(document).ready(function ($) {
    var f = $(".spig").offset().top;
    $(window).scroll(function () {
        $(".spig").animate({
                top: $(window).scrollTop() + f +200
            },
            {
                queue: false,
                duration: 1000
            });
    });
});

//鼠标点击时
jQuery(document).ready(function ($) {
    var stat_click = 0;
    $(".mumu").click(function () {
        if (!ismove) {
            stat_click++;
            if (stat_click > 4) {
                msgs = ["你有完没完呀？", "你已经摸我" + stat_click + "次了", "非礼呀！救命！OH，My ladygaga"];
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            } else {
                msgs = ["筋斗云！~我飞！", "我跑呀跑呀跑！~~",  "惹不起你，我还躲不起你么？", "不要摸我了，我会害羞的！", "干嘛动我呀！"];
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            }
        s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6,0.7,0.75,-0.1, -0.2, -0.3, -0.4, -0.5, -0.6,-0.7,-0.75];
        var i1 = Math.floor(Math.random() * s.length);
        var i2 = Math.floor(Math.random() * s.length);
        app.speakText(msgs[i]);
            $(".spig").animate({
            left: document.body.offsetWidth/2*(1+s[i1]),
            top:  document.body.offsetheight/2*(1+s[i1])
            },
            {
                duration: 500,
                complete: showMessage(msgs[i])
            });
        } else {
            ismove = false;
        }
    });
});
//新点击
jQuery(document).ready(function ($) {
    var stat_click = 0;
    $(".mumu").click(function () {
        if (!ismove) {
            msgs = [weather.c[0],weather.c[2],weather.c[5],weather.c[7]];
            // msgs = ["<iframe src=\"http://api.myhloli.com/hitokoto/\" frameborder=\"0\" scrolling=\"no\" id=\"external-frame\"  height=\"70px\" width=\"150px\" allowtransparency=\"true\" ></iframe>"];
            var i = Math.floor(Math.random() * msgs.length);
            $(".spig").animate({
                ration: 500,
                complete: showMessage(msgs[i])
            });
        } else {
            ismove = false;
        }
    });
});

//显示消息函数
function showMessage(a, b) {
    if (b == null) b = 10000;
    jQuery("#spig_message").hide().stop();
    jQuery("#spig_message").html(a);
    jQuery("#spig_message").fadeIn();
    jQuery("#spig_message").fadeTo("1", 1);
    jQuery("#spig_message").fadeOut(b);
};

//拖动
var _move = false;
var ismove = false; //移动标记
var _x, _y; //鼠标离控件左上角的相对位置
jQuery(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt($("#spig").css("left"));
        _y = e.pageY - parseInt($("#spig").css("top"));
    });
    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x;
            var y = e.pageY - _y;
            var wx = $(window).width() - $('#spig').width();
            var dy = $(document).height() - $('#spig').height();
            if(x >= 0 && x <= wx && y > 0 && y <= dy) {
                $("#spig").css({
                    top: y,
                    left: x
                }); //控件新位置
                ismove = true;
            }
        }
    }).mouseup(function () {
        _move = false;
    });
});

//天气api
var weather=Array();
weather.state=false;
$(document).ready(function(){
    $.ajax({
        dataType:"jsonp",
        success:function(data){
            if(data.success!=1){return;}
            weather.state=true;
            weather.c=Array();
            weather.c[0]="今天是"+data.result[0].days+"，"+data.result[0].week;
            weather.c[1]=data.result[0].citynm+"今天气温是"+data.result[0].temp_high+"°C到"+data.result[0].temp_low+"°C";
            weather.c[2]=data.result[0].citynm+"今天天气是"+data.result[0].weather+"  "+data.result[0].temp_high+"°C~"+data.result[0].temp_low+"°C";
            weather.c[3]=data.result[0].citynm+"今天风力是"+data.result[0].winp+"，"+data.result[0].wind;
            weather.c[4]=data.result[1].citynm+"明天气温是"+data.result[1].temp_high+"°C到"+data.result[1].temp_low+"°C";
            weather.c[5]=data.result[1].citynm+"明天天气是"+data.result[1].weather+"  "+data.result[1].temp_high+"°C~"+data.result[1].temp_low+"°C";
            weather.c[6]=data.result[2].citynm+"后天气温是"+data.result[2].temp_high+"°C到"+data.result[2].temp_low+"°C";
            weather.c[7]=data.result[2].citynm+"后天天气是"+data.result[2].weather+"  "+data.result[2].temp_high+"°C~"+data.result[2].temp_low+"°C";
        },
        type:"GET",
        url:"http://api.myhloli.com/weather/?callback=?"
    });
});