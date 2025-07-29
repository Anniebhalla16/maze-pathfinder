#!/bin/bash

echo "🚀 Starting frontend (web-ui)"
cd web-ui
npm run dev &
FRONTEND_PID=$!

echo "🧠 Starting backend (web-api)"
cd ../web-api
npx ts-node server.ts

kill $FRONTEND_PID   