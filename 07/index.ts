import { AOCSolver } from "../aoc.ts";

interface BagDef {
  color: string;
  contains: {
    qty: number;
    color: string;
  }[];
}

interface BagDefMap {
  [color: string]: BagDef;
}

const parse = (input: string): BagDefMap => {
  let lines = input.split("\n");
  return lines.reduce((obj, line) => {
    let color = [...line.matchAll(/(?<bag>[\w| ]+) bags contain/g)].map(
      (x) => x.groups?.bag
    )[0];
    if (!color) throw new Error("no color");
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
    return { ...obj, [color]: { color, contains } };
  }, {});
};

const findBagsThatContain = (bags: BagDef[], color: string) =>
  bags.reduce(
    (arr, val) =>
      val.contains.map((x) => x.color).includes(color)
        ? [...arr, val.color]
        : arr,
    [] as string[]
  );

const findAllBagsThatContain = (
  bags: BagDef[],
  colors: string[],
  checked: string[] = []
): string[] => {
  let unChecked = colors.filter((c) => !checked.includes(c));
  let containers = unChecked.map((c) => findBagsThatContain(bags, c)).flat();
  return unChecked.length
    ? findAllBagsThatContain(
        bags,
        [...colors, ...containers],
        [...checked, ...colors]
      )
    : [...new Set(colors)];
};

const solve: AOCSolver = (input) => {
  const bagMap = parse(input);
  const bags = Object.values(bagMap);
  const part1 = findAllBagsThatContain(bags, ["shiny gold"]).length - 1;
  const part2 = 0;
  return { part1, part2 };
};

export default solve;
