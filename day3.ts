const getPriority = (item: string) =>
  (item.charCodeAt(0) < "a".charCodeAt(0) ? 27 : 1) +
  item.charCodeAt(0) -
  (item.charCodeAt(0) < "a".charCodeAt(0) ? "A" : "a").charCodeAt(0);

// First part

export const solveFirst = (input: string) =>
  input
    .split(/\r?\n/gu)
    .map((rucksack) =>
      [
        [...rucksack].slice(0, rucksack.length / 2),
        [...rucksack].slice(rucksack.length / 2),
      ].map((half) =>
        half.reduce<Record<string, number>>(
          (a, i) => ({ ...a, [i]: (a[i] ?? 0) + 1 }),
          {}
        )
      )
    )
    .reduce(
      (a, [first, second]) =>
        a +
        Object.keys(first)
          .filter((letter) => second[letter])
          .map(getPriority)
          .reduce((a, e) => a + e, 0),
      0
    );

// Second part

export const solve = (input: string) =>
  input
    .split(/\r?\n/gu)
    .reduce<string[][]>(
      (a, _, i, arr) =>
        i < arr.length / 3 ? [...a, arr.slice(i * 3, i * 3 + 3)] : a,
      []
    )
    .map((three) =>
      three.map((rucksack) =>
        [...rucksack].reduce<Record<string, number>>(
          (a, i) => ({ ...a, [i]: (a[i] ?? 0) + 1 }),
          {}
        )
      )
    )
    .reduce(
      (a, [first, second, third]) =>
        a +
        Object.keys(first)
          .filter((letter) => second[letter] && third[letter])
          .map(getPriority)
          .reduce((a, e) => a + e, 0),
      0
    );
