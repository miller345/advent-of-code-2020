import { AOCSolver, getExample, getInput } from "../aoc.ts";

interface Bags {
  [color: string]: { qty: number; color: string }[];
}

const parse = (input: string) => {
  let lines = input.split("\n");
  return lines.reduce((obj, line) => {
    let topColor = [...line.matchAll(/(?<bag>[\w| ]+) bags contain/g)].map(
      (x) => x.groups?.bag
    )[0];
    if (!topColor) throw new Error("no top color");
    let contains: { qty: number; color: string }[] = [];
    if (!line.includes("no other bags")) {
      contains = [...line.matchAll(/(?<qty>\d+) (?<color>[\w| ]+) bag/g)].map(
        (x) =>
          ({
            qty: Number(x.groups?.qty),
            color: x.groups?.color,
          } as { qty: number; color: string })
      );
    }
    return { ...obj, [topColor]: contains };
  }, {});
};

const solve: AOCSolver = (input) => {
  let bags = parse(input);
  console.log(bags);
  const part1 = 0;
  const part2 = 0;
  return { part1, part2 };
};

console.log(solve(await getExample(7)));

export default solve;
