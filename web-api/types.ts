export type CellType = 'free' | 'wall' | 'start' | 'goal';
export type Grid = CellType[][];
export type Loc = [number, number];

export interface SolveRequest {
  grid: Grid;
  start: Loc;
  goal: Loc;
}

