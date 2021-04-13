var checkNetwork ={
    template: '<div><img id="img-test" style="display:none;"/><div>'
}
var app = new Vue({
    el: '#app',
    components: {
        'checknetwork': checkNetwork
    },
    methods: {
        onLine: function (callback) {
            var img = new Image();
            img.src = 'https://www.baidu.com/favicon.ico?_t=' + Date.now();
            img.onload = function () {
                if (callback) callback(true)
            };
            img.onerror = function () {
                if (callback) callback(false)
            }
        }
    }
});
app.onLine(function(flag) {
    if (flag) {
        console.log('网络畅通!')
    } else {
        console.log('网络故障!')
    }
})