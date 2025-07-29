#!/bin/bash

echo "🚀 Starting frontend (web-ui)"
cd web-ui
npm i &
npm run dev &
FRONTEND_PID=$!

echo "🧠 Starting backend (web-api)"
cd ../web-api
npm i &
npx ts-node server.ts

kill $FRONTEND_PID   