/*
* @Author: Administrator
* @Date:   2021-04-06 16:06:49
* @Last Modified by:   Administrator
* @Last Modified time: 2021-04-06 18:32:37
*/

var app = new Vue({
  el: '#app',
  data: {
    myInfo: {
      name: 'emilier',
      level: 'level1',
      startTime: '2021年4月5日',
      exerciseCount: 0 , // 练习次数
      studyLetters: 0,  // 练习单词总数量
      knowLetters: 0,  // 掌握单词数量
    },
    letterDb: [],
    letterPop: '',
    inputStr: [],
    studyCount: 0, //练习单词数量
    rightCount: 0, //练习正确数量
    errorCount: 0, //练习错误数量
    isPlay: false, //是否开始标识
    levelNum: 'level1', // 练习级别
    my_user: '',
    isSpeak: false,
    message: '',
    note:'',
    testMode: '练习',
    testLevel: '幼儿',
  },
  filters: {
    filterLetterPop: function (value, testMode, testLevel) {
      let length = value.length
      let endIndex = length > 3 ? 3 : 2
      let repStr = length >3 ? '_ _' : '_'
      let testL = {
        '幼儿': value,
        '学霸': value.replace(value.slice(1, endIndex), repStr),
        '学神': ' '
      }
      console.log('testL[testLevel]', testLevel, testMode)
      if (testMode === '测试') {
        return testL[testLevel]
      }else if(testMode === '练习'){
        return value
      }
    }
  },
  methods:{
    // 加载词库
    loadLetterDb: function(letterDbs){
      this.letterDb = []
      //letterDb = letterDbs[levelNum]; // 浅复制，后期会影响原数组的内容
      this.letterDb = [...letterDbs[this.levelNum]]// ES6 深复制
      console.log(this.letterDb)
    },
    loadLetter: function(){
      if (this.testMode == '测试'){
        this.isSpeak = true;

      }
      this.letterPop = this.letterDb.pop()
      console.log(this.letterPop)
      this.speakText(this.letterPop)
    },
    // 文字语言播放
    speakText: function(msgText){
      if (this.isSpeak) {
        let msg = new SpeechSynthesisUtterance(msgText)
        msg.volume = 100
        msg.pitch = 2
        msg.rate = 1
        //msg.lang = "en-US";
        //msg.name = "Google US English";
        //msg.voiceURI = "Google US English"
        window.speechSynthesis.speak(msg)
      }
      
    },
    init: function(){
      this.speakText("Hello Baby! 开始练习吧！");
      this.studyCount = 0
      this.rightCount = 0
      this.errorCount = 0
      this.message =''
      this.note = ''
      this.loadLetterDb(letterDbs);
      this.loadLetter();
      this.isPlay = true;
    },
    resetLoad: function(){
      this.init();
    },
    // 游戏结束
    theEnd: function(){
      this.letterPop = ''
      this.message="The End！"
      this.note = "你这次一共练习" + this.studyCount +"个单词，正确" + this.rightCount + "个,按Ctrl键重新开始！";
      this.myInfo.exerciseCount = parseInt(this.myInfo.exerciseCount) + 1;
      this.myInfo.studyLetters = parseInt(this.myInfo.studyLetters) + this.studyCount;
      localStorage.setItem(this.my_user, JSON.stringify(this.myInfo))
      this.isPlay = false;
      this.speakText("The End!");
      this.speakText(note);
    }
  },
});

app.loadLetterDb(letterDbs);
app.loadLetter();