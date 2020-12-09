import { AOCSolver } from "../aoc.ts";

const parse = (input: string) => input.split("\n").map(Number);

const getIndexCombos = (arrayLength: number): [number, number][] => {
  const arr = [] as [number, number][];
  for (let i = 0; i < arrayLength; i++) {
    for (let j = i + 1; j < arrayLength; j++) {
      arr.push([i, j]);
    }
  }
  return arr;
};

const validate = (value: number, preamble: number[]): boolean => {
  const indexCombos = getIndexCombos(preamble.length);
  const valueCombos = indexCombos.map(([a, b]) => [preamble[a], preamble[b]]);
  const validValues = valueCombos.reduce(
    (arr, [a, b]) => (a === b ? arr : [...arr, a + b]),
    []
  );
  return validValues.includes(value);
};

const findFirstInvalidValue = (
  numbers: number[],
  preambleLength: number
): number => {
  const validArr = numbers.map((v, i) => {
    if (i < preambleLength) return null; // ignore preamble
    return validate(v, numbers.slice(i - preambleLength, i + preambleLength));
  });
  return numbers[validArr.findIndex((v) => v === false)];
};

const findContiguousSet = (targetSum: number, numbers: number[]) => {
  const allRanges = getIndexCombos(numbers.length).map(([a, b]) =>
    numbers.slice(a, b + 1)
  );
  return allRanges.find((x) => x.reduce((t, x) => t + x, 0) === targetSum);
};

const solve: AOCSolver = (
  input,
  { preambleLength }: { preambleLength: number }
) => {
  const numbers = parse(input);
  const part1 = findFirstInvalidValue(numbers, preambleLength);
  const contiguousSet = findContiguousSet(part1, numbers);
  if (contiguousSet == null) throw new Error("no match");
  const part2 = Math.min(...contiguousSet) + Math.max(...contiguousSet);
  return { part1, part2 };
};

export default solve;
