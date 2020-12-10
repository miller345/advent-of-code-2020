import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { AOCResult, AOCSolver, getExample, getInput } from "./aoc.ts";
import day1 from "./01/index.ts";
import day2 from "./02/index.ts";
import day3 from "./03/index.ts";
import day4 from "./04/index.ts";
import day5 from "./05/index.ts";
import day6 from "./06/index.ts";
import day7 from "./07/index.ts";
import day8 from "./08/index.ts";
import day9 from "./09/index.ts";
import day10 from "./10/index.ts";
// import day11 from "./11/index.ts";
// import day12 from "./12/index.ts";
// import day13 from "./13/index.ts";
// import day14 from "./14/index.ts";
// import day15 from "./15/index.ts";
// import day16 from "./16/index.ts";
// import day17 from "./17/index.ts";
// import day18 from "./18/index.ts";
// import day19 from "./19/index.ts";
// import day20 from "./20/index.ts";
// import day21 from "./21/index.ts";
// import day22 from "./22/index.ts";
// import day23 from "./23/index.ts";
// import day24 from "./24/index.ts";
// import day25 from "./25/index.ts";

const testDay = (
  day: number,
  solver: AOCSolver,
  input: [AOCResult, any?],
  example?: [AOCResult, any?]
) => {
  if (example) {
    Deno.test(`Day ${day} (example)`, async () => {
      assertEquals(solver(await getExample(day), example[1]), example[0]);
    });
  }
  Deno.test(`Day ${day}`, async () => {
    assertEquals(solver(await getInput(day), input[1]), input[0]);
  });
};

const tests: [number, AOCSolver, [AOCResult, any?], [AOCResult, any?]?][] = [
  [
    1,
    day1,
    [{ part1: 73371, part2: 127642310 }],
    [{ part1: 514579, part2: 241861950 }],
  ],
  [2, day2, [{ part1: 569, part2: 346 }], [{ part1: 2, part2: 1 }]],
  [3, day3, [{ part1: 225, part2: 1115775000 }], [{ part1: 7, part2: 336 }]],
  [4, day4, [{ part1: 202, part2: 137 }]],
  [5, day5, [{ part1: 838, part2: 714 }]],
  [6, day6, [{ part1: 6549, part2: 3466 }], [{ part1: 11, part2: 6 }]],
  [7, day7, [{ part1: 337, part2: 50100 }], [{ part1: 4, part2: 32 }]],
  [8, day8, [{ part1: 1586, part2: 703 }], [{ part1: 5, part2: 8 }]],
  [
    9,
    day9,
    [{ part1: 776203571, part2: 104800569 }, { preambleLength: 25 }],
    [{ part1: 127, part2: 62 }, { preambleLength: 5 }],
  ],
  [10, day10, [{ part1: 2059, part2: 0 }], [{ part1: 220, part2: 0 }]],
  // [11, day11, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [12, day12, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [13, day13, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [14, day14, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [15, day15, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [16, day16, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [17, day17, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [18, day18, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [19, day19, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [20, day20, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [21, day21, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [22, day22, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [23, day23, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [24, day24, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
  // [25, day25, [{ part1: 0, part2: 0 }], [{ part1: 0, part2: 0 }]],
];

tests.forEach((x) => testDay(...x));
