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
): number => {
  const instr = prog[i];
  if (instr == null || history.includes(i)) return acc;
  if (instr.type === "acc")
    return exec(prog, i + 1, acc + instr.value, [...history, i]);
  if (instr.type === "jmp")
    return exec(prog, i + instr.value, acc, [...history, i]);
  return exec(prog, i + 1, acc, [...history, i]); // type === "nop"
};

const solve: AOCSolver = (input) => {
  let instructions = parse(input);
  const part1 = exec(instructions);
  const part2 = 0;
  return { part1, part2 };
};

export default solve;
