// Solution to first part lost to time

export const solve = (input: string) =>
  input
    .split(/\r?\n\r?\n/gu)
    .map((elf) =>
      elf
        .split(/\r?\n/gu)
        .map(Number)
        .reduce((a, e) => a + e, 0)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, e) => a + e);
