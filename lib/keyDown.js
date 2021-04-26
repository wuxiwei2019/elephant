/*
* @Author: Administrator
* @Date:   2021-04-06 17:35:01
* @Last Modified by:   Administrator
* @Last Modified time: 2021-04-06 18:22:31
*/
console.log("loading keyDown.js");
$(function () { $("[data-toggle='tooltip']").tooltip(); });
$(document).ready(function(){
    // 日期格式化
    Date.prototype.format = function(fmt){
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };

        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(
                    RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }

        return fmt;
    };
    // 加载用户信息函数
    function loadStudyInfo(my_user){
        if(localStorage.getItem(my_user)!=null){
            console.log(localStorage.getItem(my_user));
            let userInfo = JSON.parse(localStorage.getItem(my_user));
            app.myInfo.name = my_user;
            app.myInfo.level = userInfo.level;
            app.myInfo.startTime = userInfo.startTime;
            app.myInfo.exerciseCount = userInfo.exerciseCount;
            app.myInfo.studyLetters = userInfo.studyLetters;
            app.myInfo.studyLetterList = userInfo.studyLetterList === undefined ? [] : userInfo.studyLetterList;
            app.myInfo.knowLetters = userInfo.knowLetters;
            app.myInfo.knowLetterList = userInfo.knowLetterList === undefined ? [] :userInfo.knowLetterList;
        }else{
            app.myInfo.name=my_user;
            app.myInfo.startTime= new Date().format("yyyy年MM月dd日");
            localStorage.setItem(my_user, JSON.stringify(app.myInfo));
        }

    };
    // 刷新键盘指法提示图片
    function refreshFingerImg(){
        const nb = app.findNextLetter(app.letterPop, app.inputStr.join("")) // 取的下一个字母
        // 根据下一个字母更新键盘图片
        app.loadFingerImg(nb)
    };

    /**************************主程序首次加载执行*********************************/
    // localStorage读出用户信息
    app.my_user = localStorage.my_user;
    // 应用开始首先要弹出呢称输入框
    $('#myModal').modal('show');

    // 检测网络是否在线
    app.onLine(function(flag) {
        if (flag) {
            console.log('网络畅通!')
            app.isOnLine = true
        } else {
            console.log('网络故障!')
            $('#tip').html("网络未连接，请确保网络正常！")
            app.isOnLine = flase
        }
    })
    // 计算词库单词数量
    for(var i of levelNameList){
        app.levelLetterCount.push(letterDbs[i.value].length)
        app.levelLetters = app.levelLetters + letterDbs[i.value].length
    }
    /*************************主程序首次加载结束**********************************/


    /***************************以下为事件监测***********************************/
    // 模态框检测是否输入呢称
    $('#submitUser').click(
        function(event) {
            console.log($("#username").val());
            app.my_user = $("#username").val();
            if(app.my_user == ""){
                console.log("username is empty");
                $('#tip').html("请输入呢称，再开始玩哦！");
            }else{
                localStorage.my_user = app.my_user;
                $("#myModal").modal("hide");
                app.$message({
                    message: '记住你的呢称，下次玩的时候好用。',
                    type: 'success'
                });
                loadStudyInfo(app.my_user);
                // 判断用户是否为vip用户
                if (app.my_user === 'emilier'){
                    app.my_user.vip = true;
                }else{
                    app.my_user.vip = false;
                }
                app.init();
            }

        });
    // 窗体监测键盘输入
    $("body").keydown(function(event){
    console.log(event.keyCode);
    if(event.keyCode == 17){
        // Ctrl键，重新开始
        app.resetLoad();
        return;
    }
    if(!app.isPlay){
        // 游戏结束直接退出
        return;
    }
    if(event.keyCode == 16 && app.inputStr.length == 0){
        // Shift键，结束
        app.theEnd();
        return;
    }
    console.log(event.keyCode);
    if(event.keyCode === 8 ){ //退格键
        app.inputStr.pop();
        refreshFingerImg();
    }else if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode === 222 || event.keyCode === 32 || event.keyCode === 189 ){
        // 输入字母,空格，单引号,-
        console.log(event.keyCode);
        app.inputStr.push(event.key);
        app.speakText(event.key);

        refreshFingerImg();

    }else if(event.keyCode === 13){// 回车确认输入
        app.studyCount ++;
        app.myInfo.studyLetterList.push(app.letterPop);
        console.log(app.letterPop, app.inputStr.join(""));
        if(app.letterPop === app.inputStr.join("")){
            //$("#message").text("你真棒!");
            app.rightCount ++;
            app.rightLetters.push(app.letterPop);
            console.log("rightLetters:", app.rightLetters);
            app.speakText("excellent");
             
        }else{
            //$("#message").text("继续努力哦!");
            app.errorCount ++;
            app.speakText("Try again");
            
        }
        app.inputStr = [];
        if(app.letterDb.length >= 1){
            // 加载单词
            app.loadLetter();
            setTimeout(function (){
                app.speakText(app.letterPop)
                console.log('speaking after 2s ');
            }, 1000);
        }else{
            // 结束
            app.theEnd();
        }
        
    }
  });
    /***************************以下为事件监测--END***********************************/
});