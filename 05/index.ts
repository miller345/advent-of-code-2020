console.log("Day 5");

export const getSeatId = (str: string): number =>
  parseInt(str.replaceAll(/(B|R)/g, "1").replaceAll(/(F|L)/g, "0"), 2);

const input = await Deno.readTextFile("./05/input.txt");
const strings = input.split("\n");
const part1 = Math.max(...strings.map(getSeatId));
console.log("Part 1:", part1); // 838
// console.log("Part 2:", part2); //

export {};
