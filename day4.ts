const solveFirst = (input: string) =>
  input
    .split(/\r?\n/gu)
    .map((line) => line.split(",").map((elf) => elf.split("-").map(Number)))
    .reduce(
      (a, [[from1, to1], [from2, to2]]) =>
        a +
        ((from1 <= from2 && to1 >= to2) || (from2 <= from1 && to2 >= to1)
          ? 1
          : 0),
      0
    );

export const solve = (input: string) =>
  input
    .split(/\r?\n/gu)
    .map((line) => line.split(",").map((elf) => elf.split("-").map(Number)))
    .reduce(
      (a, [[from1, to1], [from2, to2]]) =>
        a +
        ((from1 <= from2 && to1 >= from2) || (from2 <= from1 && to2 >= from1)
          ? 1
          : 0),
      0
    );
