@echo off

echo Stopping SQL Server Express service...
sc query MSSQL$SQLEXPRESS | find "RUNNING" >nul
if %errorlevel%==0 (
    net stop MSSQL$SQLEXPRESS
) else (
    echo SQL Server Express service is not running.
)

echo Stopping backend app (dotnet)...
for /f "tokens=2" %%i in ('tasklist /FI "IMAGENAME eq dotnet.exe" /V ^| findstr /I "BankingApp.API"') do (
    taskkill /PID %%i /F >nul 2>&1
)
echo Backend app stopped.

echo Stopping frontend app (npm/node)...
tasklist /FI "IMAGENAME eq node.exe" | findstr npm >nul
if %errorlevel%==0 (
    taskkill /IM node.exe /F >nul 2>&1
    echo Frontend app stopped.
) else (
    echo Frontend app is not running.
)

echo All services stopped.
pause
