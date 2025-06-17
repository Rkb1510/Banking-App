@echo off
echo Starting SQL Server Express service...
net start MSSQL$SQLEXPRESS

echo Running EF migrations and starting backend...
cd D:\Learning\BankApp\BankingApp.API
dotnet ef database update
start "" dotnet run

echo Starting frontend React app...
cd D:\Learning\BankApp\banking-app-frontend

start "" npm start

echo All services started.
pause
