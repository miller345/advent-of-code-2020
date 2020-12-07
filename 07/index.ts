import { AOCSolver, getExample, getInput } from "../aoc.ts";

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
    if (!color) throw new Error("no top color");
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

const solve: AOCSolver = (input) => {
  let bags = parse(input);
  console.log(bags);
  let goldenContainers = findBagsThatContain(Object.values(bags), "shiny gold");
  // console.log(goldenContainers);
  const findAll = (
    bags: BagDef[],
    colors: string[],
    checked: string[] = []
  ): string[] => {
    let unChecked = colors.filter((c) => !checked.includes(c));
    if (unChecked.length) {
      let containers = unChecked
        .map((c) => findBagsThatContain(bags, c))
        .flat();
      console.log(containers);
      return findAll(bags, [...colors, ...containers], [...checked, ...colors]);
    }
    return colors;
    // return containers.length > 0 ? findAll(bags, containers) : containers;
  };
  console.log(
    new Set([...findAll(Object.values(bags), ["shiny gold"])]).size - 1
  );
  const part1 = 0;
  const part2 = 0;
  return { part1, part2 };
};

console.log(solve(await getExample(7)));
console.log(solve(await getInput(7)));

export default solve;
