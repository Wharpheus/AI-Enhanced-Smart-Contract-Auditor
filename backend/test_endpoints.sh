#!/bin/bash

# Automated endpoint test flow for backend API

set -e

SERVER_CMD="python app.py"
SERVER_PORT=5000
SERVER_HOST="127.0.0.1"
HEALTH_URL="http://$SERVER_HOST:$SERVER_PORT/api/health"
MAX_RETRIES=20
RETRY_DELAY=1

echo "🚀 Starting backend server for endpoint tests..."
cd "$(dirname "$0")"

# Start backend server in background
$SERVER_CMD > test_server.log 2>&1 &
SERVER_PID=$!

cleanup() {
    echo "🛑 Stopping backend server (PID $SERVER_PID)..."
    kill $SERVER_PID 2>/dev/null || true
    wait $SERVER_PID 2>/dev/null || true
}
trap cleanup EXIT

echo "⏳ Waiting for backend server to become healthy..."
for i in $(seq 1 $MAX_RETRIES); do
    STATUS=$(curl -s "$HEALTH_URL" | grep -o '"status": *"healthy"')
    if [ ! -z "$STATUS" ]; then
        echo "✅ Backend server is healthy."
        break
    fi
    sleep $RETRY_DELAY
done

if [ -z "$STATUS" ]; then
    echo "❌ Backend server did not become healthy in time."
    exit 1
fi

echo "🧪 Running endpoint tests with pytest..."
export TEST_BASE_URL="http://$SERVER_HOST:$SERVER_PORT"
pytest tests/test_endpoints.py --maxfail=1 --disable-warnings
TEST_EXIT_CODE=$?

echo "✅ Endpoint tests completed."
exit $TEST_EXIT_CODE