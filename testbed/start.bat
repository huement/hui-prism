@echo off
REM Hui Prism Theme Testbed Startup Script for Windows

echo 🎨 Starting Hui Prism Theme Testbed...
echo.

REM Check if we're in the right directory
if not exist "index.html" (
    echo ❌ Error: Please run this script from the testbed directory
    echo    cd testbed ^&^& start.bat
    pause
    exit /b 1
)

REM Check if theme files exist
if not exist "..\dist\theme.css" (
    echo ⚠️  Theme files not found. Building theme...
    cd ..
    call npm run build:dev
    cd testbed
)

REM Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Python not found. Please install Python to run the testbed server.
    pause
    exit /b 1
)

REM Check if port 8080 is already in use and kill existing process
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8080"') do (
    echo Killing process %%a on port 8080...
    taskkill /PID %%a /F >nul 2>&1
)

echo ✅ Starting HTTP server on port 8080...
echo 🌐 Open your browser to: http://localhost:8080/testbed/
echo ⌨️  Press Ctrl+C to stop the server
echo.

REM Start the server from parent directory to access dist folder
cd ..
python -m http.server 8080
