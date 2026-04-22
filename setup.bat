@echo off
REM Task Tracker App - Windows Setup Script

echo.
echo ========================================
echo    Task Tracker App - Setup Script
echo ========================================
echo.

REM Check Node.js
echo Checking prerequisites...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Node.js not found. Please install Node.js v14 or higher
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo [OK] Node.js installed: %NODE_VERSION%
)

echo.
echo Setting up backend...

REM Setup backend
cd backend

if exist "node_modules" (
    echo [INFO] Dependencies already installed
) else (
    echo [INFO] Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [X] Failed to install backend dependencies
        pause
        exit /b 1
    )
    echo [OK] Backend dependencies installed
)

REM Check .env file
if exist ".env" (
    echo [OK] .env file exists
) else (
    echo [X] .env file not found
    pause
    exit /b 1
)

cd ..

echo.
echo Checking frontend files...

if exist "frontend\index.html" (
    echo [OK] Frontend files found
) else (
    echo [X] Frontend files not found
    pause
    exit /b 1
)

echo.
echo Checking database...

if exist "database\schema.sql" (
    echo [OK] Database schema found
    echo [INFO] Next: Import the schema into MySQL
) else (
    echo [X] Database schema not found
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Setup completed successfully!
echo ========================================
echo.

echo Next steps:
echo.
echo 1. Setup database:
echo    mysql -u root -p ^< database\schema.sql
echo.
echo 2. Start backend (in Command Prompt):
echo    cd backend ^&^& npm start
echo.
echo 3. Start frontend (in another Command Prompt):
echo    cd frontend ^&^& python -m http.server 8000
echo.
echo 4. Open browser:
echo    http://localhost:8000
echo.
echo Or use Docker:
echo    docker-compose up -d
echo.
echo All done! Happy tracking! 
echo.
pause
