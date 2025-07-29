export type CellType = 'free' | 'wall' | 'start' | 'goal';
export type Grid = CellType[][];
export type loc = [number, number];

export interface SolveRequest {
  grid: Grid;
  start: loc;
  goal: loc;
}
