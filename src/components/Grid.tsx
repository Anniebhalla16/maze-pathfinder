'use client'; 

import { useState } from 'react';
import Cell from './Cell';

const GRID_SIZE = 20;

export default function Grid() {
  const [grid, setGrid] = useState<number[][]>(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(0))
  );

  const toggleCell = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = grid[row][col] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  return (
    <div className="grid grid-cols-20">
      {grid.map((row, row_id) =>
        row.map((cell, cell_id) => (
          <Cell
            key={`${row_id}-${cell_id}`}
            isWall={cell === 1}
            onClick={() => toggleCell(row_id, cell_id)}
          />
        ))
      )}
    </div>
  );
}
