interface Monkey {
  id: number;
  items: number[];
  op: (old: number) => number;
  divider: number;
  ifTrue: number;
  ifFalse: number;
}

const getOp = (operationLine: string) => {
  const operandRegex = "old|\\d+";
  const operationRegex = "\\+|\\*";
  const opRegex = new RegExp(
    `(${operandRegex})\\s(${operationRegex})\\s(${operandRegex})`,
    "gu"
  );

  const [[, lhsString, operandString, rhsString]] =
    operationLine.matchAll(opRegex);

  return (old: number) => {
    const lhs = lhsString === "old" ? old : Number(lhsString);
    const rhs = rhsString === "old" ? old : Number(rhsString);

    switch (operandString) {
      case "*":
        return lhs * rhs;
      case "+":
        return lhs + rhs;
      default:
        throw `Unknown operand: ${operandString}`;
    }
  };
};

const parseMonkey = (monkeyString: string): Monkey => {
  const [
    identifierLine,
    startingLine,
    operationLine,
    testLine,
    trueLine,
    falseLine,
  ] = monkeyString.split(/\r?\n/gu).map((line) => line.trim());

  const id = Number(identifierLine.match(/\d+/gu));
  const items = [...startingLine.matchAll(/\d+/gu)].map(([match]) =>
    Number(match)
  );
  const op = getOp(operationLine);
  const divider = Number(testLine.match(/\d+/gu));
  const ifTrue = Number(trueLine.match(/\d+/gu));
  const ifFalse = Number(falseLine.match(/\d+/gu));

  return { id, items, op, divider, ifTrue, ifFalse };
};

const gcd = (a: number, b: number): number => {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};

export const solve = (input: string) => {
  const monkeys = input.split(/\r?\n\r?\n/gu).map(parseMonkey);
  const activity = Array.from({ length: monkeys.length }, () => 0);

  const rounds = 20;
  for (let _ = 0; _ < rounds; _++) {
    for (let monkey of monkeys) {
      const { items, op, divider, ifFalse, ifTrue, id } = monkey;
      activity[id] += items.length;
      for (let item of items) {
        // const stress = Math.floor(op(item) / 3);
        const stress = op(item);
        monkeys[stress % divider === 0 ? ifTrue : ifFalse].items.push(stress);
      }
      monkey.items = [];
    }
  }

  console.log(activity);

  const [first, second] = activity.sort((a, b) => b - a);

  return first * second;
};
