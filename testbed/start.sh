#!/bin/bash

# Hui Prism Theme Testbed Startup Script

echo "🎨 Starting Hui Prism Theme Testbed..."
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the testbed directory"
    echo "   cd testbed && ./start.sh"
    exit 1
fi

# Check if theme files exist
if [ ! -f "../dist/theme.css" ]; then
    echo "⚠️  Theme files not found. Building theme..."
    cd ..
    npm run build:dev
    cd testbed
fi

# Check for Python
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Error: Python not found. Please install Python to run the testbed server."
    exit 1
fi

# Check if port 8080 is already in use
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 8080 is already in use. Killing existing process..."
    lsof -ti:8080 | xargs kill -9
    sleep 1
fi

echo "✅ Starting HTTP server on port 8080..."
echo "🌐 Open your browser to: http://localhost:8080/testbed/"
echo "⌨️  Press Ctrl+C to stop the server"
echo ""

# Start the server from parent directory to access dist folder
cd ..
$PYTHON_CMD -m http.server 8080 --directory .
