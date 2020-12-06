console.log("Day 6");

export const getUniqueCharCount = (str: string) => (new Set([...str])).size;

const input = await Deno.readTextFile("./06/input.txt");
// const input = await Deno.readTextFile("./06/example.txt");

const groups = input.split(/^$/gm).map((x) => x.trim().split(/\n+/gm));
const counts = groups.map((x) => getUniqueCharCount(x.flat().join("")));
const part1 = counts.reduce((t, x) => t + x, 0);
console.log("Part 1:", part1); // 6549

const part2 = groups.map((group) =>
  group.reduce(
    (result, person) => result.filter((x) => [...person].includes(x)),
    [...group[0]],
  )
).reduce((t, x) => t + x.length, 0);
console.log("Part 2:", part2); // 3466

export {};
