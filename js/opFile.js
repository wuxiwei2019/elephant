$(document).ready(function(){
    function fileDemo(myUser){
        var fso=new ActiveXObject(Scripting.FileSystemObject);
        var f=fso.opentextfile("C:/elephant_know_letters_" + myUser + ".txt",1,true);
        while (!f.AtEndOfStream) {
            f.Readline();
        }
        f.close(); 
    }
    fileDemo();
})
