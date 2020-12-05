console.log("Day 5");

export const getSeatId = (str: string): number =>
  parseInt(str.replaceAll(/(B|R)/g, "1").replaceAll(/(F|L)/g, "0"), 2);

const input = await Deno.readTextFile("./05/input.txt");
const strings = input.split("\n");
const ids = strings.map(getSeatId);
const part1 = Math.max(...ids);
const part2 = [...ids].sort((a, b) => a - b).reduce(
  (r, id, i, arr) => (id + 1 === arr[i + 1]) ? r : [...r, id + 1],
  [] as number[],
)[0];
console.log("Part 1:", part1); // 838
console.log("Part 2:", part2); // 714

export {};
