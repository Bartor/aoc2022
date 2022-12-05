type Stacks = Record<string, string[]>;

const prepareStacksSteps = (input: string): [Stacks, number[][]] => {
  const [initial, steps] = input
    .split(/\r?\n\r?\n/gu)
    .map((part) => part.split(/\r?\n/gu));

  const [names, ...content] = initial.reverse();
  const stacks =
    names.match(/\d/gu)?.reduce<Stacks>((a, e) => ({ ...a, [e]: [] }), {}) ??
    {};

  content.forEach((line) => {
    Object.keys(stacks).forEach((stackKey, i) => {
      if (line.charAt(i * 4 + 1) !== " ") {
        stacks[stackKey].push(line.charAt(i * 4 + 1));
      }
    });
  });

  return [stacks, steps.map((step) => step.split(" ").map(Number))];
};

const stackSignature = (stacks: Stacks) =>
  Object.values(stacks)
    .map((stack) => stack[stack.length - 1])
    .join("");

export const solveFirst = (input: string) => {
  const [stacks, steps] = prepareStacksSteps(input);

  steps.forEach(([, count, , from, , to]) => {
    while (count-- > 0) stacks[to].push(stacks[from].pop() as string);
  });

  return stackSignature(stacks);
};

export const solve = (input: string) => {
  const [stacks, steps] = prepareStacksSteps(input);

  steps.forEach(([, count, , from, , to]) => {
    stacks[to].push(...stacks[from].splice(-count));
  });

  return stackSignature(stacks);
};
