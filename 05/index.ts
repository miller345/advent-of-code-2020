import { AOCSolver } from "../aoc.ts";

export const getSeatId = (str: string): number =>
  parseInt(str.replaceAll(/(B|R)/g, "1").replaceAll(/(F|L)/g, "0"), 2);

const solve: AOCSolver = (input) => {
  const strings = input.split("\n");
  const ids = strings.map(getSeatId);
  const part1 = Math.max(...ids);
  const part2 = [...ids].sort((a, b) => a - b).reduce(
    (r, id, i, arr) => (id + 1 === arr[i + 1]) ? r : [...r, id + 1],
    [] as number[],
  )[0];
  return { part1, part2 };
};

export default solve;
