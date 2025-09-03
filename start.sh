#!/bin/bash

echo "🚀 Starting AI Smart Contract Auditor..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Backend directory not found."
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Create environment files if they don't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating frontend environment file..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
fi

if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend environment file..."
    echo "NEW_VARIABLE_NAME=your_openai_api_key_here" > backend/.env
    echo "FLASK_ENV=development" >> backend/.env
    echo "FLASK_DEBUG=True" >> backend/.env
    echo "HOST=0.0.0.0" >> backend/.env
    echo "PORT=5000" >> backend/.env
fi

echo "✅ Setup complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Add your OpenAI API key to backend/.env"
echo "2. Run 'npm run dev' to start the frontend"
echo "3. Run 'cd backend && python app.py' to start the backend"
echo ""
echo "🌐 Frontend will be available at: http://localhost:3000"
echo "🔗 Backend will be available at: http://localhost:5000" 