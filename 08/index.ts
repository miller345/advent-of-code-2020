import { AOCSolver, getExample, getInput } from "../aoc.ts";

interface Instruction {
  type: "nop" | "acc" | "jmp";
  value: number;
}

const parse = (input: string): Instruction[] => {
  return input.split("\n").map((x) => {
    const [type, value] = x.split(" ") as ["nop" | "acc" | "jmp", string];
    return { type, value: Number(value) };
  });
};

const exec = (
  prog: Instruction[],
  i = 0,
  acc = 0,
  history: number[] = []
): { result: number; success: boolean } => {
  const instr = prog[i];
  if (instr == null) return { result: acc, success: true };
  if (history.includes(i)) return { result: acc, success: false };
  if (instr.type === "acc")
    return exec(prog, i + 1, acc + instr.value, [...history, i]);
  if (instr.type === "jmp")
    return exec(prog, i + instr.value, acc, [...history, i]);
  return exec(prog, i + 1, acc, [...history, i]); // type === "nop"
};

const solve: AOCSolver = (input) => {
  let instructions = parse(input);
  const { result: part1 } = exec(instructions);
  const indexes = instructions.reduce(
    (arr, instr, i) =>
      ["jmp", "nop"].includes(instr.type) ? [...arr, i] : arr,
    [] as number[]
  );
  const programs = indexes.map((i) => {
    let arr = instructions.map((x) => ({ ...x })); // clone
    arr[i].type = arr[i].type === "jmp" ? "nop" : "jmp";
    return arr;
  });
  const results = programs.map((p) => exec(p));
  const part2 = results.find((x) => x.success === true)?.result!;
  return { part1, part2 };
};

export default solve;
