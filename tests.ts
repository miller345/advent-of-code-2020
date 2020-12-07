import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { AOCResult, AOCSolver, getExample, getInput } from "./aoc.ts";
import day1 from "./01/index.ts";
import day2 from "./02/index.ts";
import day3 from "./03/index.ts";
import day4 from "./04/index.ts";
import day5 from "./05/index.ts";
import day6 from "./06/index.ts";
import day7 from "./07/index.ts";

const testDay = (
  day: number,
  solver: AOCSolver,
  result: AOCResult,
  exampleResult?: AOCResult
) => {
  if (exampleResult) {
    Deno.test(`Day ${day} (example)`, async () => {
      assertEquals(solver(await getExample(day)), exampleResult);
    });
  }
  Deno.test(`Day ${day}`, async () => {
    assertEquals(solver(await getInput(day)), result);
  });
};

const tests: [number, AOCSolver, AOCResult, AOCResult?][] = [
  [
    1,
    day1,
    { part1: 73371, part2: 127642310 },
    { part1: 514579, part2: 241861950 },
  ],
  [2, day2, { part1: 569, part2: 346 }, { part1: 2, part2: 1 }],
  [3, day3, { part1: 225, part2: 1115775000 }, { part1: 7, part2: 336 }],
  [4, day4, { part1: 202, part2: 137 }],
  [5, day5, { part1: 838, part2: 714 }],
  [6, day6, { part1: 6549, part2: 3466 }, { part1: 11, part2: 6 }],
  [7, day7, { part1: 337, part2: 50100 }, { part1: 4, part2: 32 }],
];

tests.forEach((x) => testDay(...x));
