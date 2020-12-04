console.log("Day 4");

type Passport = { [key: string]: string };

export const parse = (str: string): Passport[] =>
  str
    .split(/^$/gm)
    .map((line) =>
      [...line.matchAll(/(?<key>\w{3}):(?<value>\S+)/gm)]
        .map((match) => match.groups!)
        .reduce((obj, { key, value }) => ({ ...obj, [key]: value }), {})
    );

const isValid = (passport: Passport) =>
  [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
  ].reduce(
    (result, key) => result && Object.keys(passport).includes(key),
    true,
  );

export const isValidV2 = (p: Passport) => {
  if (!isValid(p)) return false;
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  if (!(Number(p.byr) >= 1920 && Number(p.byr) <= 2002)) return false;
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  if (!(Number(p.iyr) >= 2010 && Number(p.iyr) <= 2020)) return false;
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  if (!(Number(p.eyr) >= 2020 && Number(p.eyr) <= 2030)) return false;
  // hgt (Height) - a number followed by either cm or in:
  if (!(p.hgt.match(/^\d+(cm|in)$/))) return false;
  // If cm, the number must be at least 150 and at most 193.
  if (p.hgt.match(/^\d+cm$/)) {
    let hgt = Number(p.hgt.replace(/\D/g, ""));
    if (!(hgt >= 150 && hgt <= 193)) return false;
  }
  // If in, the number must be at least 59 and at most 76.
  if (p.hgt.match(/^\d+in$/)) {
    let hgt = Number(p.hgt.replace(/\D/g, ""));
    if (!(hgt >= 59 && hgt <= 76)) return false;
  }
  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  if (!(p.hcl.match(/^#([0-9a-f]){6}$/))) return false;
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  if (
    !(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(p.ecl))
  ) {
    return false;
  }
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  if (!(p.pid.match(/^\d{9}$/))) return false;
  // cid (Country ID) - ignored, missing or not.
  return true;
};

// const input = await Deno.readTextFile("./04/example.txt");
const input = await Deno.readTextFile("./04/input.txt");
const lines = parse(input);
const part1 = lines.map(isValid).reduce((t, b) => t + (b ? 1 : 0), 0);
const part2 = lines.map(isValidV2).reduce((t, b) => t + (b ? 1 : 0), 0);
console.log("Part 1:", part1); // 202
console.log("Part 2:", part2); // 137

export {};
