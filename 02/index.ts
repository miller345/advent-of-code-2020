console.log("Day 2");

// const input = await Deno.readTextFile("./02/example.txt");
const input = await Deno.readTextFile("./02/input.txt");

interface Line {
  x: number;
  y: number;
  char: string;
  password: string;
}

const regex = /^(?<x>\d+)-(?<y>\d+) (?<char>\S): (?<password>\S+)$/gm;

let lines = [...input.matchAll(regex)].map((
  match,
) => ({
  ...match.groups,
  x: Number(match.groups?.x),
  y: Number(match.groups?.y),
} as Line));

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

console.log("Part 1:", trueCount(lines.map(validate))); // 569

console.log("Part 2:", trueCount(lines.map(validateV2))); // 346

export {};
