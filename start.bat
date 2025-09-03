@echo off
echo 🚀 Starting AI Smart Contract Auditor...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
npm install

REM Check if backend directory exists
if not exist "backend" (
    echo ❌ Backend directory not found.
    pause
    exit /b 1
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
pip install -r requirements.txt
cd ..

REM Create environment files if they don't exist
if not exist ".env.local" (
    echo 📝 Creating frontend environment file...
    echo NEXT_PUBLIC_API_URL=http://localhost:5000 > .env.local
)

if not exist "backend\.env" (
    echo 📝 Creating backend environment file...
    echo NEW_VARIABLE_NAME=your_openai_api_key_here > backend\.env
    echo FLASK_ENV=development >> backend\.env
    echo FLASK_DEBUG=True >> backend\.env
    echo HOST=0.0.0.0 >> backend\.env
    echo PORT=5000 >> backend\.env
)

echo ✅ Setup complete!
echo.
echo 🔧 Next steps:
echo 1. Add your OpenAI API key to backend\.env
echo 2. Run 'npm run dev' to start the frontend
echo 3. Run 'cd backend ^&^& python app.py' to start the backend
echo.
echo 🌐 Frontend will be available at: http://localhost:3000
echo 🔗 Backend will be available at: http://localhost:5000
pause 