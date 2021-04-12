@echo off
set current_path=%cd%
::start chrome.exe --allow-file-access-from-files  --app=https://www.baidu.com
start chrome.exe --allow-file-access-from-files  --app=file:///%current_path%/index.html