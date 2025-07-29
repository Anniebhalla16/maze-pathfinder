export const GRID_SIZE = 20;

export type MODES = 'GENERATE_MAZE' | 'SELECT_START' | 'SELECT_GOAL';

export type CellType = 'start' | 'goal' | 'free' | 'wall' | 'path' | 'visited'