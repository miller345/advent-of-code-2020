import { AOCSolver } from "../aoc.ts";

type Instr =
  | "N" // move north by the given value.
  | "S" // move south by the given value.
  | "E" // move east by the given value.
  | "W" // move west by the given value.
  | "L" // turn left the given number of degrees.
  | "R" // turn right the given number of degrees.
  | "F"; // move forward by the given value in the direction

type Cmd = [Instr, number];

type Direction = "N" | "E" | "S" | "W";

const parse = (input: string) =>
  input.split("\n").map((x) => {
    const [l, ...n] = [...x];
    return [l, Number(n.join(""))] as Cmd;
  });

const getNewDirection = (current: Direction, cmd: Cmd): Direction => {
  const cw: Direction[] = ["N", "E", "S", "W"];
  let steps = 0;
  if (cmd[0] === "R") steps = cmd[1] / 90;
  if (cmd[0] === "L") steps = (cmd[1] / 90) * -1;
  const currentIndex = cw.indexOf(current);
  let newIndex = (currentIndex + steps) % cw.length;
  if (newIndex < 0) newIndex = newIndex + cw.length;
  return cw[newIndex];
};

const resolveDirections = (cmds: Cmd[]): [Cmd, Direction][] => {
  const rtn: [Cmd, Direction][] = [];
  cmds.forEach((cmd, i) => {
    if (i === 0) {
      rtn.push([cmd, "E"]);
    } else {
      rtn.push([cmd, getNewDirection(rtn[i - 1][1], rtn[i - 1][0])]);
    }
  });
  return rtn;
};

const convertToAbsolute = (state: [Cmd, Direction][]): Cmd[] => {
  return state.reduce((arr, [cmd, dir]) => {
    if (["L", "R"].includes(cmd[0])) return arr; // remove L / R
    if (cmd[0] === "F") return [...arr, [dir, cmd[1]]]; // convert F to direction
    return [...arr, cmd]; // don't change N S E W
  }, [] as Cmd[]);
};

const getTranslation = (cmds: Cmd[]): [number, number] => {
  return convertToAbsolute(resolveDirections(cmds)).reduce(
    ([x, y], [instr, val]) => {
      if (instr === "N") return [x, y + val];
      if (instr === "E") return [x + val, y];
      if (instr === "S") return [x, y - val];
      if (instr === "W") return [x - val, y];
      return [x, y];
    },
    [0, 0]
  );
};

const getManhattan = ([x, y]: [number, number]) => Math.abs(x) + Math.abs(y);

const solve: AOCSolver = (input) => {
  const cmds = parse(input);
  const part1 = getManhattan(getTranslation(cmds));
  const part2 = 0;
  return { part1, part2 };
};

export default solve;
