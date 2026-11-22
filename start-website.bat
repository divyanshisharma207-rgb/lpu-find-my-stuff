@echo off
title LPU Find My Stuff - Campus Lost & Found
echo Starting LPU Find My Stuff server...
start http://localhost:5173
call npm.cmd run dev
pause
