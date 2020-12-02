console.log("Day 1");

// const textFile = await Deno.readTextFile("./01/example.txt");
const textFile = await Deno.readTextFile("./01/input.txt");
const numbers = textFile.split("\n").map((x) => Number(x));

for (let i = 0; i < numbers.length; i++) {
  const x = numbers[i];
  for (let j = i + 1; j < numbers.length; j++) {
    const y = numbers[j];
    if (x + y === 2020) {
      console.log("Part 1", x * y);
    }
    if (x + y < 2020) {
      for (let k = j + 1; k < numbers.length; k++) {
        const z = numbers[k];
        if (x + y + z === 2020) {
          console.log("Part 2", x * y * z);
        }
      }
    }
  }
}

export {};
