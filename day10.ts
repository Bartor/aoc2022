export const solve = (input: string) => {
  const cyclesToRegister = new Set([20, 60, 100, 140, 180, 220]);
  const results: Record<number, string> = {};
  let strength = 0;
  let cycle = 0;
  let x = 1;

  const instructionArguments = input
    .split(/\r?\n/gu)
    .map((instruction) => instruction.split(" ").map(Number)[1]);

  const increment = () => {
    cycle++;
    if (cyclesToRegister.has(cycle)) strength += cycle * x;
    const pixelPosition = cycle % 40;
    results[cycle] =
      pixelPosition - x >= 0 && pixelPosition - x < 3 ? "#" : " ";
  };

  for (let arg of instructionArguments) {
    if (arg === undefined) {
      increment();
    } else {
      increment();
      increment();
      x += arg;
    }

    if (cycle >= 240) break;
  }

  const text = Object.values(results)
    .reduce<string[][]>(
      (a, _, i, arr) =>
        i > arr.length / 40 ? a : [...a, arr.slice(i * 40, (i + 1) * 40)],
      []
    )
    .map((line) => line.join(""))
    .join("\n");

  console.log(text);

  return strength;
};
