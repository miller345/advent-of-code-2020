console.log("Day 4");

type Passport = { [key: string]: string };

const required = [
  "byr", // (Birth Year)
  "iyr", // (Issue Year)
  "eyr", // (Expiration Year)
  "hgt", // (Height)
  "hcl", // (Hair Color)
  "ecl", // (Eye Color)
  "pid", // (Passport ID)
  // (optional) "cid", // (Country ID)
];

const isValid = (passport: Passport) =>
  required.reduce(
    (result, key) => result && Object.keys(passport).includes(key),
    true,
  );

// const input = await Deno.readTextFile("./04/example.txt");
const input = await Deno.readTextFile("./04/input.txt");

let lines: Passport[] = input
  .split(/^$/gm)
  .map((line) =>
    [...line.matchAll(/(?<key>\w{3}):(?<value>\S+)/gm)]
      .map((match) => match.groups!)
      .reduce((obj, { key, value }) => ({ ...obj, [key]: value }), {})
  );

const part1 = lines.map(isValid).reduce((t, b) => t + (b ? 1 : 0), 0);

console.log("Part 1:", part1); // 202
// console.log("Part 2:", part2); //

export {};
