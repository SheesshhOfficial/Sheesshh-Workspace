@echo off
setlocal
set "SHEESSHH_LAUNCH_ROOT=%~dp0"
if exist "%LOCALAPPDATA%\Sheesshh Workspace\sheesshh-workspace.exe" (
  start "" "%LOCALAPPDATA%\Sheesshh Workspace\sheesshh-workspace.exe" --repo "%SHEESSHH_LAUNCH_ROOT%."
  exit /b 0
)
if exist "%SHEESSHH_LAUNCH_ROOT%src-tauri\target\release\sheesshh-workspace.exe" (
  start "" "%SHEESSHH_LAUNCH_ROOT%src-tauri\target\release\sheesshh-workspace.exe" --repo "%SHEESSHH_LAUNCH_ROOT%."
  exit /b 0
)
echo Install Sheesshh Workspace from this project's GitHub Releases.
echo Or build with: powershell -NoProfile -ExecutionPolicy Bypass -File Setup.ps1 -Mode Desktop
echo See docs\getting-started.md for agent-guided setup.
pause
