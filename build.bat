@echo off
echo Deleting...
rd /s /q dist
mkdir dist
echo Building...
node browserifyBundle.js
echo Done!
dir dist\main.js
