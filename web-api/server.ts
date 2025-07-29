import { RequestHandler } from 'express';
import http from 'http';
import { WebSocket } from 'ws';
import { AStarSearch } from './src/AStarSearch';
import { SolveRequest } from './types';

const express = require('express');
const cors = require('cors');

// app is express application for http get post requests
const app = express();
// server is Nodejs httpserver instance that wraps the express app
//  we can attach the websocket server to the same http server
const server = http.createServer(app);
const port = 3001;

const wss = new WebSocket.Server({ server });
let socket: WebSocket | null;

wss.on('connection', function connection(ws) {
  console.log('Our new client connected');
  socket = ws;

  ws.on('close', () => {
    console.log('Websocket disconnected');
    socket = null;
  });
});

app.use(cors());
app.use(express.json());

const solveHandler: RequestHandler = async (req, res) => {
  const { grid, start, goal } = req.body as SolveRequest;

  if (!start || !goal || !grid) {
    return res.status(400).json({ error: 'Missing Input(s) for A* Algorithm' });
  }

  try {
    const result = await AStarSearch(grid, start, goal, (pos) => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'visit', pos }));
      }
    });

    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: result.path.length === 0 ? 'unreachable' : 'done',
          path: result.path,
          visited: result.visited,
        })
      );
    }

    return res.status(200).json({ status: 'search started' });
  } catch (error) {
    console.error('A* failed:', error);
    return res.status(500).json({ error: 'Internal server error' }); // fallback
  }
};

app.post('/solve', solveHandler);

server.listen(port, () => {
  console.log('Listening on port 3001');
});
