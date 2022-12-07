// Change to 4 for first
const SIZE = 14;

export const solve = (input: string) => {
  let start = SIZE;
  while (new Set([...input].slice(start - SIZE, start)).size !== SIZE) start++;
  return start;
};
