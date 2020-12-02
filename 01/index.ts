// const textFile = await Deno.readTextFile("./01/example.txt");
const textFile = await Deno.readTextFile("./01/input.txt");
const numbers = textFile.split("\n").map((x) => Number(x));

function partOne(numbers: number[], targetSum: number): number | null {
  for (let i = 0; i < numbers.length; i++) {
    const x = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) {
      const y = numbers[j];
      if (x + y === targetSum) {
        return x * y;
      }
    }
  }
  return null;
}

const result = partOne(numbers, 2020); // 73371

console.log(result);

function partTwo(numbers: number[], targetSum: number): number | null {
  for (let i = 0; i < numbers.length; i++) {
    const x = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) {
      const y = numbers[j];
      for (let k = j + 1; k < numbers.length; k++) {
        const z = numbers[k];
        if (x + y + z === targetSum) {
          return x * y * z;
        }
      }
    }
  }
  return null;
}

const result2 = partTwo(numbers, 2020);

console.log(result2); // 127642310

export {};
