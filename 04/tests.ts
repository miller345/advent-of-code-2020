import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { isValidV2, parse } from "./index.ts";

Deno.test("4 Invalid Passports", async () => {
  const input = await Deno.readTextFile("./04/invalid.txt");
  assertEquals(parse(input).map(isValidV2), [false, false, false, false]);
});

Deno.test("4 Valid Passports", async () => {
  const input = await Deno.readTextFile("./04/valid.txt");
  assertEquals(parse(input).map(isValidV2), [true, true, true, true]);
});

export {};
