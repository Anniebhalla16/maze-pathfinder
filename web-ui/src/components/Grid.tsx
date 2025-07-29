'use client';

import { CellType, GRID_SIZE, MODES } from '@/types/cellTypes';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Cell from './Cell';

export default function Grid() {
  const [mode, setMode] = useState<MODES>('GENERATE_MAZE');
  const [start, setStart] = useState<[number, number] | null>(null);
  const [goal, setGoal] = useState<[number, number] | null>(null);

  const [grid, setGrid] = useState<CellType[][]>(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill('free'))
  );

  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map((r) => [...r]);
    if (mode === 'GENERATE_MAZE') {
      if (grid[row][col] === 'start' || grid[row][col] === 'goal') return;
      newGrid[row][col] = grid[row][col] === 'wall' ? 'free' : 'wall';
    } else if (mode === 'SELECT_START') {
      if (start) newGrid[start[0]][start[1]] = 'free';
      newGrid[row][col] = 'start';
      setStart([row, col]);
    } else if (mode === 'SELECT_GOAL') {
      if (goal) newGrid[goal[0]][goal[1]] = 'free';
      newGrid[row][col] = 'goal';
      setGoal([row, col]);
    }
    setGrid(newGrid);
  };

  const solveMaze = async () => {
    if (!start || !goal) {
      alert('Please set both start and goal points');
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL}/solve`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grid, start, goal }),
      }
    );

    const data = await response.json();
    console.log('A* search started:', data.status);
  };

  useEffect(() => {
    const socket = new WebSocket(
      process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL!.replace('http', 'ws')
    );

    socket.onopen = () => console.log('🟢 WebSocket connected');
    socket.onclose = () => console.log('🔴 WebSocket disconnected');

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'visit') {
        const [r, c] = message.pos;
        setGrid((prev) => {
          const updated = prev.map((row) => [...row]);
          if (updated[r][c] === 'free') {
            updated[r][c] = 'visited';
          }
          return updated;
        });
      }

      if (message.type === 'done') {
        const { path } = message;
        setGrid((prev) => {
          const updated = prev.map((row) => [...row]);
          for (const [r, c] of path) {
            if (updated[r][c] === 'free' || updated[r][c] === 'visited') {
              updated[r][c] = 'path';
            }
          }
          return updated;
        });
      }
    };

    return () => socket.close();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* Generates a 20x20 grid  */}
        <div className="grid grid-cols-20">
          {grid.map((row, row_id) =>
            row.map((cell, cell_id) => (
              <Cell
                key={`${row_id}-${cell_id}`}
                type={grid[row_id][cell_id]}
                onClick={() => toggleCell(row_id, cell_id)}
              />
            ))
          )}
        </div>

        {/* Buttons for interactivity */}
        {/* 1. Generate maze - allows use to toggle the walls and generate a maze */}
        {/* 2. Choose Start - allows user to choose a starting point */}
        {/* 3. Choose Goal - allows user to choose the end goal of maze path finder */}
        {/* 4. Solve - generates a post request to backend which then returns an A* solution to solve the user defined maze, the solution is viewed live 
          using web socket */}

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Button
              onClick={() => setMode('GENERATE_MAZE')}
              variant={mode === 'GENERATE_MAZE' ? 'outlined' : 'text'}
            >
              Generate Maze
            </Button>
            <Button
              onClick={() => setMode('SELECT_START')}
              variant={mode === 'SELECT_START' ? 'outlined' : 'text'}
              color="success"
            >
              Select Start
            </Button>
            <Button
              onClick={() => setMode('SELECT_GOAL')}
              variant={mode === 'SELECT_GOAL' ? 'outlined' : 'text'}
              color="error"
            >
              Select Goal
            </Button>
          </div>
          {/* Todo: solve function */}
          <Button onClick={solveMaze} variant="contained">
            Solve
          </Button>
        </div>
      </div>
    </>
  );
}
