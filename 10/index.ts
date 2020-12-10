import { AOCSolver } from "../aoc.ts";
import { getExample, getInput } from "../aoc.ts";

const parse = (input: string) => input.split("\n").map(Number);

// can take an input 1, 2, or 3 jolts lower than its rating
// 3

const findNext = (adapters: number[], prev: number) => {
  const i = adapters.findIndex((x) => x >= prev + 1 && x <= prev + 3);
  const value = adapters[i];
  if (!value) throw new Error("no match");
  const remaining = [...adapters];
  remaining.splice(i, 1);
  return {
    value,
    diff: value - prev,
    remaining,
  };
};

const findAll = (
  adapters: number[],
  prev: number,
  arr: { value: number; diff: number; remaining: number[] }[] = []
): { value: number; diff: number; remaining: number[] }[] => {
  const next = findNext(adapters, prev);
  if (next.remaining.length) {
    return findAll(next.remaining, next.value, [...arr, next]);
  } else {
    return [...arr, next];
  }
};

const solve: AOCSolver = (input) => {
  const adapters = parse(input);
  adapters.sort((a, b) => a - b);
  const results = findAll(adapters, 0);
  const diffs = results.reduce(
    (obj, v) => ({ ...obj, [v.diff]: (obj[v.diff] ?? 0) + 1 }),
    { 3: 1 } as { [diff: number]: number }
  );
  // console.log(diffs);
  const part1 = diffs[1] * diffs[3];
  const part2 = 0;
  return { part1, part2 };
};

console.log(solve(await getExample(10)));
console.log(solve(await getInput(10)));

export default solve;
