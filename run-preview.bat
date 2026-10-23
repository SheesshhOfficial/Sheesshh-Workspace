@echo off
setlocal
cd /d "%~dp0"
title Sheesshh Workspace Preview

echo Starting Sheesshh Workspace Preview...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File ".\Setup.ps1" -Mode Preview

if %ERRORLEVEL% neq 0 (
  echo.
  echo An error occurred while starting the workspace preview.
  pause
)
