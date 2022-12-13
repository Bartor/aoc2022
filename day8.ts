export const solve = (input: string) => {
  const grid = input.split(/\r?\n/gu).map((line) => line.split("").map(Number));
  const height = grid.length;
  const width = grid[0].length;

  let visible = 2 * height + 2 * width - 4;
  let maxScore = 0;

  for (let row = 1; row < height - 1; row++) {
    for (let column = 1; column < width - 1; column++) {
      let [l, t, r, b] = [0, 0, 0, 0];

      // from left
      for (let c = column - 1; c >= 0; c--) {
        l++;
        if (grid[row][c] >= grid[row][column]) break;
      }

      // from top
      for (let r = row - 1; r >= 0; r--) {
        t++;
        if (grid[r][column] >= grid[row][column]) break;
      }

      // from right
      for (let c = column + 1; c < width; c++) {
        r++;
        if (grid[row][c] >= grid[row][column]) break;
      }

      // from bottom
      for (let r = row + 1; r < height; r++) {
        b++;
        if (grid[r][column] >= grid[row][column]) break;
      }

      if (
        (l === column && grid[row][0] < grid[row][column]) ||
        (t === row && grid[0][column] < grid[row][column]) ||
        (r === width - column - 1 &&
          grid[row][width - 1] < grid[row][column]) ||
        (b === height - row - 1 && grid[height - 1][column] < grid[row][column])
      )
        visible++;

      const score = l * t * r * b;

      if (score > maxScore) maxScore = score;
    }
  }

  return [visible, maxScore];
};
