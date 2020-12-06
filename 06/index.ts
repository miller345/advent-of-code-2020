console.log("Day 6");

export const getUniqueCharCount = (str: string) => (new Set([...str])).size;

const input = await Deno.readTextFile("./06/input.txt");
console.log(
  "Part 1:",
  input.split(/^$/gm).map((x) => x.replace(/\n/gm, "")).map(getUniqueCharCount)
    .reduce((t, x) => t + x, 0),
); // 6549

export {};
