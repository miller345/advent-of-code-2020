console.log("Day 3");

type MapValue = "." | "#";

type MapTile = MapValue[][];

// (0, 0) at top left
interface Coord {
  x: number;
  y: number;
}

const getValue = (map: MapTile, coord: Coord): MapValue | null => {
  const height = map.length;
  const y = coord.y;
  if (y >= height) return null;
  const width = map[0].length;
  const x = coord.x % width;
  return map[y][x];
};

const getTreeCount = (mapTile: MapTile, translation: Coord): number => {
  let val;
  let x = 0;
  let y = 0;
  let treeCount = 0;
  while (val !== null) {
    x = x + translation.x;
    y = y + translation.y;
    val = getValue(mapTile, { x, y });
    if (val === "#") treeCount++;
  }
  return treeCount;
};

// const input = await Deno.readTextFile("./03/example.txt");
const input = await Deno.readTextFile("./03/input.txt");
const mapTile = input.split("\n").map((x) => x.split("")) as MapTile;

let results = [
  getTreeCount(mapTile, { x: 1, y: 1 }),
  getTreeCount(mapTile, { x: 3, y: 1 }),
  getTreeCount(mapTile, { x: 5, y: 1 }),
  getTreeCount(mapTile, { x: 7, y: 1 }),
  getTreeCount(mapTile, { x: 1, y: 2 }),
];

let part1 = results[1];
let part2 = results.reduce((total, v) => total * v, 1);

console.log("Part 1:", part1); // 225
console.log("Part 2:", part2); // 1115775000

export {};
