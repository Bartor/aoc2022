interface LineElement {
  x: number;
  y: number;
}

const updateMotion = (leading: LineElement, following: LineElement): void => {
  const [dx, dy] = [following.x - leading.x, following.y - leading.y];

  if (dx ** 2 + dy ** 2 > 2) {
    following.x += +(dx !== 0) * (dx > 0 ? -1 : 1);
    following.y += +(dy !== 0) * (dy > 0 ? -1 : 1);
  }
};

export const solve = (input: string) => {
  const visited = new Set<string>();

  const segments = Array.from(
    // First part
    // { length: 2 },
    { length: 10 },
    () =>
      ({
        x: 0,
        y: 0,
      } as LineElement)
  );
  const [head] = segments;

  input
    .split(/\r?\n/gu)
    .map((line) => line.split(" "))
    .forEach(([where, times]) => {
      for (let _ = 0; _ < Number(times); _++) {
        switch (where) {
          case "L": {
            head.x--;
            break;
          }
          case "U": {
            head.y++;
            break;
          }
          case "R": {
            head.x++;
            break;
          }
          case "D": {
            head.y--;
            break;
          }
        }

        for (let i = 0; i < segments.length - 1; i++) {
          updateMotion(segments[i], segments[i + 1]);
        }

        visited.add(
          `${segments[segments.length - 1].x},${
            segments[segments.length - 1].y
          }`
        );
      }
    });

  return visited.size;
};
