@echo off
set current_path=%cd%\index.html
::start chrome.exe --allow-file-access-from-files  --app=https://www.baidu.com 

:: create VBS
::set SCRIPT="%TEMP%\%RANDOM%-%RANDOM%-%RANDOM%-%RANDOM%.vbs"
 
::echo Set oWS = WScript.CreateObject("WScript.Shell") >> %SCRIPT%
::echo sLinkFile = "%USERPROFILE%\Desktop\Elephant.lnk" >> %SCRIPT%
::echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
::echo oLink.TargetPath = "%current_path%" >> %SCRIPT%
::echo oLink.TargetPath = "chrome.exe --allow-file-access-from-files  --app=file:///%current_path%" >> %SCRIPT%
::echo oLink.Save >> %SCRIPT%
 
::cscript /nologo %SCRIPT%
::echo 创建快捷方式成功！
::pause
::del %SCRIPT%
start chrome.exe --allow-file-access-from-files  --app=file:///%current_path%