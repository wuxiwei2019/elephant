$(document).ready(function(){
   /* 初始化数据*/
  let letterDb = [];
  let letterPop = "";
  let inputStr = [];
  let studyCount = 0; //练习单词数量
  let rightCount = 0; //练习正确数量
  let errorCount = 0; //练习错误数量
  let isPlay = false; //是否开始标识
  let levelNum = "level1"; // 练习级别
  let my_user = "";
  const MY_INFO = {
    "name": "",
    "level": "level1",
    "startTime": "2021年4月5日",
    "exerciseCount": 0 , // 练习次数
    "studyLetters": 0,  // 练习单词总数量
    "knowLetters": 0,  // 掌握单词数量
  };
  
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
   }
  
  // 加载词库
  function loadLetterDb(){
      letterDb = [];
      //letterDb = letterDbs[levelNum]; // 浅复制，后期会影响原数组的内容
      letterDb = [...letterDbs[levelNum]]; // ES6 深复制
      $("#level_span").text("-" + levelNum);
      console.log(letterDb);
  }
  
  // 加载单词
  function loadLetter(){
      letterPop = letterDb.pop();
      $("#myLetter").text(letterPop);
      speakText(letterPop); 
  }

  // 游戏结束
  function theEnd(){
    $("#message").text("The End！");
    const note = "你这次一共练习" + studyCount +"个单词，正确" + rightCount + "个,按Ctrl键重新开始！";
    MY_INFO.exerciseCount = parseInt(MY_INFO.exerciseCount) + 1;
    MY_INFO.studyLetters = parseInt(MY_INFO.studyLetters) + studyCount;
    localStorage.setItem(my_user, JSON.stringify(MY_INFO))
    loadStudyInfo(my_user);
    $("#note").text(note);
    $("#myLetter").text("");
    isPlay = false;
    speakText("The End!");
    speakText(note);
  }
  // 重新开始
  function resetLoad(){
    isPlay = true;
    //window.document.location.reload();
    init();
  }
  // 文字语言播放
  function speakText(msgText){
    var msg = new SpeechSynthesisUtterance(msgText);
    msg.volume = 100;
    msg.pitch = 2;
    msg.rate = 1;
    //msg.lang = "en-US";
    //msg.name = "Google US English";
    //msg.voiceURI = "Google US English"
    window.speechSynthesis.speak(msg);
  }
  function init(){
    speakText("Hello Baby! 开始练习吧！");
    studyCount = 0;
    rightCount = 0;
    errorCount = 0;
    $("#message").text("");
    $("#note").text("");
    $("#myLetter").text("");
    $("#myInput").text("");
    $(".progress-bar-success").css("width", 0);
    $(".progress-bar-danger").css("width", 0);
    $("#right_label").text(rightCount);
    $("#error_label").text(errorCount);
    loadLetterDb();
    loadLetter();
    isPlay = true;
  }
  
  function loadStudyInfo(my_user){
      $("#my_user").html(my_user);
      if(localStorage.getItem(my_user)!=null){
          console.log(localStorage.getItem(my_user));
          let userInfo = JSON.parse(localStorage.getItem(my_user));
          // $("#my_level").html(userInfo.level);
          // $("#my_startTime").html(userInfo.startTime);
          // $("#my_exerciseCount").html(userInfo.exerciseCount);
          // $("#my_studyLetters").html(userInfo.studyLetters);
          // $("#my_knowLetters").html(userInfo.knowLetters);
          
          MY_INFO.level = userInfo.level;
          MY_INFO.startTime = userInfo.startTime;
          MY_INFO.exerciseCount = userInfo.exerciseCount;
          MY_INFO.studyLetters = userInfo.studyLetters;
          MY_INFO.knowLetters = userInfo.knowLetters;
      }else{
          MY_INFO.name=my_user;
          MY_INFO.startTime= new Date().format("yyyy年MM月dd日");
          localStorage.setItem(my_user, JSON.stringify(MY_INFO));
      }
      
  }
  
  // 应用开始首先要弹出呢称输入框
  $('#myModal').modal('show');
  
  // 以下为事件监测
  
  // 模态框检测是否输入呢称
  $('#submitUser').click(
    function(event) {
        console.log($("#username").val());
        my_user = $("#username").val();
        if(my_user == ""){
            console.log("username is empty");
            $('#tip').html("请输入呢称，再开始玩哦！");
        }else{
            $("#myModal").modal("hide");
            alert("记住你的呢称，下次玩的时候好用。");
            init();
            loadStudyInfo(my_user);
        }
        
  });
  
  $(".level").click(function(event){
    // 加载单词级别库
    levelNum = $(this).attr("href").replace("#","");
    console.log(levelNum);
    init();
  });
  
  $("#exit").click(function(event){
    // 退出
    //window.close();
    var e = jQuery.Event("keydown"); //模拟一个键盘事件
    e.altKey = true;
    e.keyCode = 115;
    e.which =115;
    $("body").trigger(e);
    console.log(e.altKey, e.ctrlKey, e.shiftKey, e.keyCode);
    // Alt + s
    //if (e.altKey && e.keyCode===83) {
        //alert("Alt + s key down");
    //}
  });
  
  // 监测键盘输入
  $("body").keydown(function(event){
    if(event.keyCode == 17){
        // Ctrl键，重新开始
        resetLoad();
        return;
    }
    if(!isPlay){
        // 游戏结束直接退出
        return;
    }
    if(event.keyCode == 16 && inputStr.length == 0){
        // Shift键，结束
        theEnd();
        return;
    }
	console.log(event.keyCode);
	if(event.keyCode == 8 ){
		inputStr.pop();
	}else if (event.keyCode >= 65 && event.keyCode <= 90 ){
        // 只能输入字母
		inputStr.push(event.key);
        speakText(event.key);
	}else if(event.keyCode == 13 || event.keyCode == 32){
        studyCount ++;
        console.log(letterPop, inputStr.join(""));
        $("").hide();
        if(letterPop == inputStr.join("")){
            //$("#message").text("你真棒!");
            rightCount ++;
            $(".progress-bar-success").css("width", rightCount)
            $("#right_label").text(rightCount);
            speakText("excellent");
             
        }else{
            //$("#message").text("继续努力哦!");
            errorCount ++;
            $(".progress-bar-danger").css("width", errorCount)
            $("#error_label").text(errorCount);
            speakText("Try again");
            
        }
        inputStr = [];
        if(letterDb.length >= 1){
            $("#message").text("");
            // 加载单词
            loadLetter();
        
            /*setTimeout(function(){
                $("#message").text("");
                // 加载单词
                loadLetter();
            },1500);*/
        }else{
            // 结束
            theEnd();
        }
        
    }
    // 字母输入并显示
	$("#myInput").text(inputStr.join(""));
  });
});