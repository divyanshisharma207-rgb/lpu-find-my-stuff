@echo off
title Deploy LPU Find My Stuff to GitHub
echo ==============================================
echo   Deploying LPU Find My Stuff to GitHub
echo ==============================================
echo.
git add .
git commit -m "Update LPU Find My Stuff website"
echo.
echo Pushing to GitHub main branch...
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo SUCCESS: Deployed to GitHub!
    echo Your GitHub Pages workflow will now build and publish your site.
) else (
    echo.
    echo NOTE: If the repository doesn't exist yet, create it first at:
    echo https://github.com/new?name=lpu-find-my-stuff
    echo Then run this file again!
)
echo.
pause
