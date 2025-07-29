import { RequestHandler } from "express";
import http from 'http';
import { SolveRequest } from "./types";

const express = require('express')
const cors = require('cors');

// app is express application for http get post requests
const app = express()
// server is Nodejs httpserver instance that wraps the express app
//  we can attach thewebsocket server to the same http server
const server = http.createServer(app);
const port = 3001

app.use(cors());
app.use(express.json());

const solveHandler: RequestHandler = (req, res) => {
  const { grid, start, goal } = req.body as SolveRequest;

  if(!start || !goal || !grid) {
        return res.status(400).json({error: "Missing Input(s) for A* Algorithm"})
    }
    // dummy data
    const path = [start, goal]; 
    const visitedCount = 10;
    const pathLength = path.length;

    res.json({ path, pathLength, visitedCount });
};

app.post('/solve', solveHandler);

app.listen(port,()=>{
    console.log("Listening on port 3001")
})