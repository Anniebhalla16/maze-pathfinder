// A* Algorithm Implementation
import { Grid, Loc } from '../types';

type Node = {
  position: Loc;
  g: number;
  h: number;
  f: number;
  parent?: Node;
};

// Euclidean Distance as the heuristic
const heuristic = (a: Loc, b: Loc): number =>
  Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);

const contains = (list: Loc[], [r, c]: Loc) =>
  list.some(([lr, lc]) => lr === r && lc === c);

export async function AStarSearch(
  grid: Grid,
  start: Loc,
  goal: Loc,
  onVisit: (pos: Loc) => void
): Promise<{ path: Loc[]; visited: Loc[] }> {
  const openSet: Node[] = [];
  const closedSet: Loc[] = [];
  const visited: Loc[] = [];

  //  for starting node g =0 
  const startNode: Node = {
    position: start,
    g: 0,
    h: heuristic(start, goal),
    f: heuristic(start, goal), // f = g + h, f = 0 + h = heuristic(start, goal)
  };

  // Step 1: push the start node to the open list
  openSet.push(startNode);

  // Step 2: Repeat 

  while (openSet.length > 0) {
    // Step 2.1: sort openSet list by lowest f ie nodes with lowest total cost are visited first
    openSet.sort((a, b) => a.f - b.f);

    // Current sq with lowest total cost
    const current_sq = openSet.shift()!;
    const [row, col] = current_sq.position;

    // if already visited before, ie if already in closedSet then we continue with next node in openSet to explore
    if (contains(closedSet, [row, col])) continue;

    // Else we push in closedSet and Visited node + show live updates
    closedSet.push(current_sq.position);
    visited.push(current_sq.position);

    // to show live updates using web socket
    onVisit(current_sq.position);

    // if the current_sq is goal node then path is found tracing back through parents - STOP
    if (row === goal[0] && col === goal[1]) {
      const path: Loc[] = [];
      let temp: Node | undefined = current_sq;
      while (temp) {
        path.unshift(temp.position);
        temp = temp.parent;
      }
      return { path, visited };
    }

    //  if goal not reached explore the 8 neighbors
    const neighbors: Loc[] = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    for (const [r, c] of neighbors) {
      if (
        r < 0 || c < 0 || r >= grid.length || c >= grid[0].length ||
        grid[r][c] === 'wall' || contains(closedSet, [r, c])) {
        continue;
      }

      const g = current_sq.g + 1;
      const h = heuristic([r, c], goal)
      const NeighborNode: Node = {
        position: [r, c],
        g,
        h,
        f: g + h,
        parent: current_sq
      }

      openSet.push(NeighborNode)
    }

    await new Promise((r) => setTimeout(r, 40));
  }


  return { path: [], visited };
}
