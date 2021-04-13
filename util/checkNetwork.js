export default {
    name: 'checkNetwork',
    img : '<img id="img-test" style="display:none;" onerror="console.log(\'网络故障\')"/>'
}
export function onLine(callback){
    var img = new Image();
    img.src = 'https://www.baidu.com/favicon.ico?_t=' + Date.now();
    img.onload=function(){
        if (callback) callback(true)
    };
    img.onerror=function(){
        if (callback) callback(false)
    };
}
// export onLine(function(flag) {
// //     if (flag) {
// //         console.log('网络畅通')
// //     } else {
// //         console.log('网络故障')
// //     }
// // })