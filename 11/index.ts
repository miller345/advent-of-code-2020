import { AOCSolver } from "../aoc.ts";

type Cell =
  | "L" // empty
  | "#" // occupied
  | "."; // floor
type Row = Cell[];
type Grid = Row[];

type Coords = [number, number]; // [x, y]
type Direction = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

const parse = (input: string): Grid =>
  input.split("\n").map((x) => x.split("") as Row);

const getCell = (grid: Grid, [x, y]: Coords): Cell | undefined => grid[y]?.[x];

const getNeighbours = (grid: Grid, [x, y]: Coords): Cell[] => {
  const top = [x - 1, x, x + 1].map((x) => getCell(grid, [x, y - 1]));
  const middle = [x - 1, x + 1].map((x) => getCell(grid, [x, y]));
  const bottom = [x - 1, x, x + 1].map((x) => getCell(grid, [x, y + 1]));
  return [...top, ...middle, ...bottom].filter((a) => a != null) as Cell[];
};

const getFirstSeatInDirection = (
  grid: Grid,
  [x, y]: Coords,
  direction: Direction
): "L" | "#" | undefined => {
  let translation: [number, number] = [0, 0];
  if (direction === "N") translation = [0, -1];
  if (direction === "NE") translation = [1, -1];
  if (direction === "E") translation = [1, 0];
  if (direction === "SE") translation = [1, 1];
  if (direction === "S") translation = [0, 1];
  if (direction === "SW") translation = [-1, 1];
  if (direction === "W") translation = [-1, 0];
  if (direction === "NW") translation = [-1, -1];
  const coords = [x + translation[0], y + translation[1]] as Coords;
  const cell = getCell(grid, coords);
  if (cell === ".") return getFirstSeatInDirection(grid, coords, direction);
  if (cell == "#" || cell === "L") return cell;
  if (!cell) return undefined;
};

const getVisibleSeats = (grid: Grid, coords: Coords): ("L" | "#")[] => {
  const all = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as Direction[];
  return all
    .map((d) => getFirstSeatInDirection(grid, coords, d))
    .filter((c) => c !== undefined) as ("L" | "#")[];
};

const getNextCell = (cell: Cell, neighbours: Cell[]): Cell => {
  if (cell === "L" && !neighbours.includes("#")) return "#";
  if (cell === "#" && neighbours.filter((a) => a === "#").length >= 4)
    return "L";
  return cell;
};

const getNextCellV2 = (grid: Grid, coords: Coords): Cell => {
  const cell = getCell(grid, coords) as Cell;
  const visible = getVisibleSeats(grid, coords);
  if (cell === "L" && !visible.includes("#")) return "#";
  if (cell === "#" && visible.filter((a) => a === "#").length >= 5) return "L";
  return cell;
};

const getNextGrid = (grid: Grid): Grid => {
  return grid.map((row, y) =>
    row.map((cell, x) => getNextCell(cell, getNeighbours(grid, [x, y])))
  );
};

const getNextGridV2 = (grid: Grid): Grid => {
  return grid.map((row, y) =>
    row.map((cell, x) => getNextCellV2(grid, [x, y]))
  );
};

const gridToString = (grid: Grid): string =>
  grid.map((row) => row.join("")).join("\n");

const gridEquals = (a: Grid, b: Grid) => gridToString(a) === gridToString(b);

const getFinalGrid = (grid: Grid, nextGridGetter: (g: Grid) => Grid): Grid => {
  function* makeGridsIterator(
    startGrid: Grid,
    nextGridGetter: (g: Grid) => Grid
  ) {
    let currentGrid = startGrid;
    while (true) {
      let nextGrid = nextGridGetter(currentGrid);
      if (gridEquals(currentGrid, nextGrid)) return;
      currentGrid = nextGrid;
      yield nextGrid;
    }
  }
  let grids = [...makeGridsIterator(grid, nextGridGetter)];
  return grids[grids.length - 1];
};

const countOccupied = (grid: Grid) =>
  grid.flat().filter((c) => c === "#").length;

const solve: AOCSolver = (input) => {
  const grid = parse(input);
  const part1 = countOccupied(getFinalGrid(grid, getNextGrid));
  const part2 = countOccupied(getFinalGrid(grid, getNextGridV2));
  return { part1, part2 };
};

export default solve;
