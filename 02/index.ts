import { AOCSolver } from "../aoc.ts";

interface Line {
  x: number;
  y: number;
  char: string;
  password: string;
}

const validate = (line: Line) => {
  let regex = new RegExp(line.char, "g");
  let occurences = (line.password.match(regex) ?? []).length;
  return occurences >= line.x && occurences <= line.y;
};

const validateV2 = (line: Line) => {
  const hasCharAt = (index: number) =>
    line.password.charAt(index - 1) === line.char;
  return hasCharAt(line.x) !== hasCharAt(line.y);
};

const trueCount = (bools: boolean[]) =>
  bools.reduce((total, valid) => valid ? total + 1 : total, 0);

const solve: AOCSolver = (input) => {
  const regex = /^(?<x>\d+)-(?<y>\d+) (?<char>\S): (?<password>\S+)$/gm;
  const lines = [...input.matchAll(regex)].map((
    match,
  ) => ({
    ...match.groups,
    x: Number(match.groups?.x),
    y: Number(match.groups?.y),
  } as Line));
  return {
    part1: trueCount(lines.map(validate)),
    part2: trueCount(lines.map(validateV2)),
  };
};

export default solve;
