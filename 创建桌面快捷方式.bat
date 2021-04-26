@echo off
set current_path=%cd%
:: create VBS
set SCRIPT="%TEMP%\%RANDOM%-%RANDOM%-%RANDOM%-%RANDOM%.vbs"
rem 设置快捷方式图标
set icon= "%current_path%\img\favicon.ico"
 
echo Set oWS = WScript.CreateObject("WScript.Shell") >> %SCRIPT%
echo sLinkFile = "%USERPROFILE%\Desktop\Elephant.lnk" >> %SCRIPT%
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
echo oLink.TargetPath = "%current_path%\大象英语.bat" >> %SCRIPT%
echo oLink.WorkingDirectory = "%current_path%" >> %SCRIPT%
echo oLink.IconLocation = %icon% >> %SCRIPT%
::echo oLink.TargetPath = "chrome.exe --allow-file-access-from-files  --app=file:///%current_path%" >> %SCRIPT%
echo oLink.Save >> %SCRIPT%
 
cscript /nologo %SCRIPT%
echo Create Desktop Shortcut Success!
pause
del %SCRIPT%