$(document).ready(function(){
    function fileDemo(){
        var fso=new ActiveXObject(Scripting.FileSystemObject);
        var f=fso.opentextfile("C:\elephant.txt",1,true);
        while (!f.AtEndOfStream) {
            f.Readline();
        }
        f.close(); 
    }
    fileDemo();
})
