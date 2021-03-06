/*
* @Author: Administrator
* @Date:   2021-04-06 16:06:49
* @Last Modified by:   Administrator
* @Last Modified time: 2021-04-06 18:32:37
*/
const VERSION = 'V1.2'
document.title = document.title + '-' + VERSION
var app = new Vue({
  el: '#app',
  data: {
    myInfo: {
      name: '',
      vip:'false',
      level: 'level1',
      startTime: '2021年4月5日',
      exerciseCount: 0 , // 练习次数
      studyLetters: 0,  // 练习单词总数量
      studyLetterList: [], // 练习过的单词库
      knowLetters: 0,  // 已掌握单词数量
      knowLetterList: [] //已掌握的单词库
    },
    letterDb: [], //加载的单词库
    letterPop: '', //新单词
    inputStr: [], //键盘输入字母数组
    studyCount: 0, //练习单词数量
    rightCount: 0, //练习正确数量
    errorCount: 0, //练习错误数量
    rightLetters: [], // 练习正确的单词数组
    isPlay: false, //是否开始标识
    isStudyAll: false, // 是否全量练习
    isFinger: true, // 指法提醒
    imgFinger: 'img/finger.png', // 指法图片路径
    levelNum: 'level1', // 练习级别
    my_user: '', // 当前用户
    isSpeak: false, // 是否开启拼读
    isOnLine: false, // 网络在线标识
    message: '',
    note:'',
    testMode: '练习',
    testLevel: '幼儿',
    levelRange: 1, //加载单词范围指针1-10
    dialogFormVisible: false,
    dialogFormVisible2: false,
    dialogFormVisible3: false,
    form: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
    formLabelWidth: '120px',
    levelGroup:{ // 成绩
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
      level6: 0,
      level9: 0
    },
    levelGroup2:{ //练习
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
      level6: 0,
      level9: 0
    },
    levelLetterCount: [],
    levelLetters: 0,
    isViewKnowLetters: false,
    letterSize:80,

  },
  filters: {
    filterLetterPop: function (value, testMode, testLevel) {
      let length = value.length
      let endIndex = length > 3 ? 3 : 2
      let repStr = length >3 ? '_ _' : '_'
      let testL = {
        '幼儿': value.replace(value.slice(0, 1), '_'),
        '学霸': value.replace(value.slice(1, endIndex), repStr),
        '学神': ' '
      }
      console.log('testL[testLevel]', testLevel, testMode)
      if (testMode === '测试') {
        return testL[testLevel]
      }else if(testMode === '练习'){
        return value
      }
    },
    // 将一个单词首字母大写
    toTitle: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods:{
    // 检测网络是否在线
    onLine: function (callback) {
      var img = new Image();
      img.src = 'https://www.baidu.com/favicon.ico?_t=' + Date.now();
      img.onload = function () {
        if (callback) callback(true)
      };
      img.onerror = function () {
        if (callback) callback(false)
      }
    },

    /***************** 计算每个级别掌握的单词数量 showLevelGroupInfo*******/
    // 我的课程
    showLevelGroupInfo: function(){
      let {levelGroup, dialogFormVisible } = this.loadLevelDialog(this.levelGroup, this.myInfo.knowLetterList, this.dialogFormVisible);
      this.levelGroup = levelGroup;
      this.dialogFormVisible = dialogFormVisible;
      this.isViewKnowLetters = false;
    },
    // 我的练习
    showLevelGroupInfo2: function(){
      let {levelGroup, dialogFormVisible } = this.loadLevelDialog(this.levelGroup2, this.myInfo.studyLetterList,this.dialogFormVisible2);
      this.levelGroup2 = levelGroup;
      this.dialogFormVisible2 = dialogFormVisible;
    },
    // 级别窗体 loadLevelsDialog
    loadLevelDialog: function(levelGroup, letterList, dialogFormVisible){
      // 重置级别变量
      for (var i in levelGroup){
        levelGroup[i] = 0
      }
      for(var item of letterList){
        for(var i of levelNameList){
          if (letterDbs[i.value].indexOf(item)>=0){
            levelGroup[i.value] ++;
          }
        }
      }
      // 计算进度百分比
      let llc_index = 0
      for ( var i of levelNameList){
        levelGroup[i.value] = (levelGroup[i.value]/ this.levelLetterCount[llc_index] *100).toFixed(2)
        llc_index ++;
      }
      dialogFormVisible = true

      return { levelGroup, dialogFormVisible }
    },
    /*****************showLevelGroupInfo  END**************************/
    //
    viewKnowLetters: function(){
      this.isViewKnowLetters = true;
    },

    // 检测模式
    changeTestMode: function(){
      console.log('changeTestMode()', this.testMode)
      if (this.testMode === '练习'){
        this.isSpeak = false
      }else if(this.testMode === '测试'){
        this.isSpeak = true
      }
    },
    // 加载词库
    loadLetterDb: function(letterDbs){
      this.letterDb = []
      //letterDb = letterDbs[levelNum]; // 浅复制，后期会影响原数组的内容
      this.letterDb = [...letterDbs[this.levelNum]]// ES6 深复制
      // 是否需要选择单词范围
      if (this.levelRange > 1){
        let start_index = this.levelRange * 10
        this.letterDb = this.letterDb.slice(start_index)
      }
      // 数组转置后，POP操作将从第一个单词开始
      this.letterDb = this.letterDb.reverse()

      console.log(this.letterDb)
    },
    // 从加载词库弹出一个单词
    loadLetter: function(){
      if (this.testMode === '测试'){
        this.isSpeak = true;
      }
      let letter = this.letterDb.pop()
      if (!this.isStudyAll){
        // 如果单词在已掌握的词库中，则重新获取新的
        while (this.myInfo.knowLetterList.indexOf(letter) >= 0){
          letter = this.letterDb.pop()
        }
      }
      // 判断词库的单词是否已经全部掌握，undefined 表示已经全部掌握
      if (letter === undefined) {
        this.$message({
          type: 'error',
          message: this.levelNum + '级词库在【' + this.testMode + '】下已练习完，可以选择全量练习或下一级'
        })
      }else{
        this.letterPop = letter
        const nl = this.findNextLetter(this.letterPop, this.inputStr.join(""))
        this.loadFingerImg(nl)
        console.log(this.letterPop)
      }

    },
    // 根据输入的内容取下一个字母
    findNextLetter: function (letterPop, inputStr){
      const i = letterPop.length - (letterPop.length - inputStr.length)
      return letterPop.slice(i,i + 1)
    },
    // 根据字母加载指法图片
    loadFingerImg: function(nl){
      for(var item of fingers_keys){
        console.log("键盘组：", item)
        if(item.indexOf(nl) >=0 ){
          this.imgFinger = fingers[item]
        }
      }
    },
    // 文字语音播放
    speakText: function(msgText){
      if (!this.isSpeak){
        return
      }
      if (this.myInfo.vip == false) {
        // 浏览器默认读音播放
        let msg = new SpeechSynthesisUtterance(msgText)
        msg.volume = 100
        msg.pitch = 2
        msg.rate = 1
        //msg.lang = "en-US";
        //msg.name = "Google US English";
        //msg.voiceURI = "Google US English"
        window.speechSynthesis.speak(msg)
      } else {
        var url = "https://tts.baidu.com/text2audio?cuid=baike&lan=ZH&ctp=1&pdt=301&vol=9&rate=32&per=0&tex=" + encodeURI(msgText);  // baidu文字转语音
        var voiceContent = new Audio(url);
        voiceContent.src = url;
        voiceContent.play();
      }
      
    },
    // 初始化程序
    init: function(){
      this.speakText("Hello Baby! 开始练习吧！");
      this.studyCount = 0
      this.rightCount = 0
      this.errorCount = 0
      this.message =''
      this.note = ''
      // 加载词库
      this.loadLetterDb(letterDbs)
      this.loadLetter()
      this.isPlay = true
    },
    // 重新加载
    resetLoad: function(){
      this.init();
    },

    // 游戏结束
    theEnd: function(){
      this.letterPop = ''
      this.message="The End！"
      this.note = "你这次一共练习" + this.studyCount +"个单词，正确" + this.rightCount + "个,按Ctrl键重新开始！"
      this.myInfo.exerciseCount = parseInt(this.myInfo.exerciseCount) + 1
      this.myInfo.studyLetters = parseInt(this.myInfo.studyLetters) + this.studyCount
      if (this.testMode === '测试'){
        this.myInfo.knowLetters = parseInt(this.myInfo.knowLetters) + this.rightCount
        this.myInfo.knowLetterList = this.myInfo.knowLetterList.concat(this.rightLetters) //合并数组
      }
      localStorage.setItem(this.my_user, JSON.stringify(this.myInfo))
      this.isPlay = false
      this.speakText("The End!" + note)

      // 调用spig.js下的showMessage函数，小精灵显示消息
      showMessage(visitor + this.note, 6000);
    }
  },
  watch:{
    // 根据级别变化动态加载词库
    levelNum: function () {
      this.init()
    },
    // 新加载的单词如果太长进行字体调整
    letterPop: function () {
      if(this.letterPop.length > 10 ){
        this.letterSize = 60
      }else{
        this.letterSize = 80
      }
    }
  }
});

//app.loadLetterDb(letterDbs);
//app.loadLetter();