import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { getSeatId } from "./index.ts";

// BFFFBBFRRR: row 70, column 7, seat ID 567.
// FFFBBBFRRR: row 14, column 7, seat ID 119.
// BBFFBBFRLL: row 102, column 4, seat ID 820.

Deno.test("getSeatId", () => {
  assertEquals(getSeatId("BFFFBBFRRR"), 567);
});
Deno.test("getSeatId", () => {
  assertEquals(getSeatId("FFFBBBFRRR"), 119);
});
Deno.test("getSeatId", () => {
  assertEquals(getSeatId("BBFFBBFRLL"), 820);
});
