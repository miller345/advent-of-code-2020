import { AOCSolver } from "../aoc.ts";

const solve: AOCSolver = (input) => {
  const numbers = input.split("\n").map((x) => Number(x));
  let part1, part2;
  for (let i = 0; i < numbers.length; i++) {
    const x = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) {
      const y = numbers[j];
      if (x + y === 2020) {
        part1 = x * y;
      }
      if (x + y < 2020) {
        for (let k = j + 1; k < numbers.length; k++) {
          const z = numbers[k];
          if (x + y + z === 2020) {
            part2 = x * y * z;
          }
        }
      }
    }
  }
  if (part1 == null || part2 == null) throw new Error("solution not found");
  return { part1, part2 };
};

export default solve;
