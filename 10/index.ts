import { AOCSolver } from "../aoc.ts";

const parse = (input: string) => input.split("\n").map(Number);

const findNext = (adapters: number[], prev: number) => {
  const i = adapters.findIndex((x) => x >= prev + 1 && x <= prev + 3);
  const value = adapters[i];
  if (!value) return null;
  const remaining = [...adapters];
  remaining.splice(i, 1);
  return {
    value,
    index: i,
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
  if (next === null) return arr;
  if (next.remaining.length) {
    return findAll(next.remaining, next.value, [...arr, next]);
  } else {
    return [...arr, next];
  }
};

const countBranches = (
  adapters: number[],
  from = 0,
  branchesAtIndex: { [i: number]: number } = {}
): number => {
  if (branchesAtIndex[from] != null) return branchesAtIndex[from]; // return from the cache if can
  if (from === adapters.length - 1) return 1; // if at end just 1 branch
  // get the indexes of the next possible value
  const nextIndexes = adapters.slice(from).reduce((arr, x, i) => {
    return x >= adapters[from] + 1 && x <= adapters[from] + 3
      ? [...arr, i + from]
      : arr;
  }, [] as number[]);
  // count up the branches at those indexes & cache them
  nextIndexes.forEach((i) => {
    branchesAtIndex[i] = countBranches(adapters, i, branchesAtIndex);
  });
  // then add them all up (values will be in cache)
  return nextIndexes.reduce(
    (t, x) => t + countBranches(adapters, x, branchesAtIndex),
    0
  );
};

const solve: AOCSolver = (input) => {
  const adapters = parse(input);
  adapters.sort((a, b) => a - b);
  const results = findAll(adapters, 0);
  const diffs = results.reduce(
    (obj, v) => ({ ...obj, [v.diff]: (obj[v.diff] ?? 0) + 1 }),
    { 3: 1 } as { [diff: number]: number }
  );
  const part1 = diffs[1] * diffs[3];
  const part2 = countBranches([0, ...adapters], 0);
  return { part1, part2 };
};

export default solve;
