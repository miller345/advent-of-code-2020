console.log("Day 4");

const input = await Deno.readTextFile("./04/example.txt");
// const input = await Deno.readTextFile("./04/input.txt");

let lines = input
  .split(/^$/gm)
  .map((line) =>
    [...line.matchAll(/(?<key>\w{3}):(?<value>\S+)/gm)]
      .map((match) => match.groups!)
      .reduce((obj, { key, value }) => ({ ...obj, [key]: value }), {})
  );

console.log(lines);

// console.log("Part 1:", part1); //
// console.log("Part 2:", part2); //

export {};
