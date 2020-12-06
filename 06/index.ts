import { AOCSolver } from "../aoc.ts";

export const getUniqueCharCount = (str: string) => (new Set([...str])).size;

const solve: AOCSolver = (input) => {
  const groups = input.split(/^$/gm).map((x) => x.trim().split(/\n+/gm));
  const counts = groups.map((x) => getUniqueCharCount(x.flat().join("")));
  const part1 = counts.reduce((t, x) => t + x, 0);
  const part2 = groups.map((group) =>
    group.reduce(
      (result, person) => result.filter((x) => [...person].includes(x)),
      [...group[0]],
    )
  ).reduce((t, x) => t + x.length, 0);
  return { part1, part2 };
};

export default solve;
