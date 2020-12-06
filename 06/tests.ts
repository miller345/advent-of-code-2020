import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { getUniqueCharCount } from "./index.ts";

Deno.test("getUniqueCharCount", () => {
  assertEquals(getUniqueCharCount("abc"), 3);
});
Deno.test("getUniqueCharCount", () => {
  assertEquals(getUniqueCharCount("abac"), 3);
});
Deno.test("getUniqueCharCount", () => {
  assertEquals(getUniqueCharCount("aaaa"), 1);
});
Deno.test("getUniqueCharCount", () => {
  assertEquals(getUniqueCharCount("b"), 1);
});
