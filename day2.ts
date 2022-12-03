// Solution to first part lost to time

type GameMapping = Record<string, string>;

const drawMap: GameMapping = {
  A: "X", // rock
  B: "Y", // paper
  C: "Z", // scissors
};

const loseMap: GameMapping = {
  A: "Z",
  B: "X",
  C: "Y",
};

const winMap: GameMapping = {
  A: "Y",
  B: "Z",
  C: "X",
};

const mapMap: Record<string, GameMapping> = {
  X: loseMap,
  Y: drawMap,
  Z: winMap,
};

const scoreMap: Record<string, number> = {
  X: 0,
  Y: 3,
  Z: 6,
};

const pointMap: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

export const solve = (input: string) =>
  input
    .split(/\r?\n/gu)
    .map((round) => round.split(" "))
    .reduce((a, [op, me]) => a + pointMap[mapMap[me][op]] + scoreMap[me], 0);
