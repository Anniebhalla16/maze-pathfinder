import { AStarSearch } from '../src/AStarSearch';
import { Grid, Loc } from '../types';

describe('A* Pathfinding', () => {
  const basicGrid: Grid = [
    ['start', 'free', 'free'],
    ['wall', 'wall', 'free'],
    ['free', 'free', 'goal'],
  ];

  const start: Loc = [0, 0];
  const goal: Loc = [2, 2];

  it('should find a valid path to goal', async () => {
    const { path, visited } = await AStarSearch(
      basicGrid,
      start,
      goal,
      () => {}
    );
    expect(path[0]).toEqual(start);
    expect(path[path.length - 1]).toEqual(goal);
    expect(path.length).toBeGreaterThan(0);
    expect(visited.length).toBeGreaterThan(0);
  });

  it('should return empty path if goal is unreachable', async () => {
    const blockedGrid: Grid = [
      ['start', 'wall', 'goal'],
      ['wall', 'wall', 'wall'],
    ];

    const { path } = await AStarSearch(blockedGrid, [0, 0], [0, 2], () => {});
    expect(path.length).toBe(0);
  });
});
