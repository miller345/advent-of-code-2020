import { AOCSolver } from "../aoc.ts";

type Cell =
  | "L" // empty
  | "#" // occupied
  | "."; // floor
type Row = Cell[];
type Grid = Row[];

const parse = (input: string): Grid =>
  input.split("\n").map((x) => x.split("") as Row);

const getCell = (grid: Grid, [x, y]: [number, number]): Cell | undefined =>
  grid[y]?.[x];

const getNeighbours = (grid: Grid, [x, y]: [number, number]): Cell[] => {
  const top = [x - 1, x, x + 1].map((x) => getCell(grid, [x, y - 1]));
  const middle = [x - 1, x + 1].map((x) => getCell(grid, [x, y]));
  const bottom = [x - 1, x, x + 1].map((x) => getCell(grid, [x, y + 1]));
  return [...top, ...middle, ...bottom].filter((a) => a != null) as Cell[];
};

const getNextCell = (cell: Cell, neighbours: Cell[]): Cell => {
  if (cell === "L" && !neighbours.includes("#")) return "#";
  if (cell === "#" && neighbours.filter((a) => a === "#").length >= 4)
    return "L";
  return cell;
};

const getNextGrid = (grid: Grid): Grid => {
  return grid.map((row, y) =>
    row.map((cell, x) => getNextCell(cell, getNeighbours(grid, [x, y])))
  );
};

const gridToString = (grid: Grid): string =>
  grid.map((row) => row.join("")).join("\n");

const gridEquals = (a: Grid, b: Grid) => gridToString(a) === gridToString(b);

function* makeGridsIterator(startGrid: Grid) {
  let currentGrid = startGrid;
  while (true) {
    let nextGrid = getNextGrid(currentGrid);
    if (gridEquals(currentGrid, nextGrid)) return;
    currentGrid = nextGrid;
    yield nextGrid;
  }
}

const getFinalGrid = (grid: Grid): Grid => {
  let grids = [...makeGridsIterator(grid)];
  return grids[grids.length - 1];
};

const solve: AOCSolver = (input) => {
  const grid = parse(input);
  const lastGrid = getFinalGrid(grid);
  const part1 = lastGrid.flat().filter((c) => c === "#").length;
  const part2 = 0;
  return { part1, part2 };
};

export default solve;
