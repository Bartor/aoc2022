interface TreeNode {
  name: string;
  size: number; // 0 for dirs
  totalSize: number;
  parent: TreeNode | null;
  children: TreeNode[];
}

interface State {
  root: TreeNode;
  cwd: TreeNode;
}

const getCommands = (input: string) => input.split("$ ").filter((l) => l);

const parseCommand = (command: string) =>
  command
    .split(/\r?\n/gu)
    .filter((l) => l)
    .map((line) => line.split(" "));

const interpreter: Record<
  string,
  (param: string, ...output: string[][]) => (state: State) => void
> = {
  cd: (path: string) => (state: State) => {
    switch (path) {
      case "/":
        state.cwd = state.root;
        break;
      case "..":
        state.cwd = state.cwd.parent!;
        break;
      default:
        state.cwd = state.cwd.children.find(
          (childNode) => childNode.name === path
        )!;
        break;
    }
  },
  ls:
    (_: string, ...output: string[][]) =>
    (state: State) => {
      output.forEach((node) => {
        const [size, name] = node;
        const realSize = Number(size) || 0;

        if (realSize > 0) {
          let parent: TreeNode | null = state.cwd;
          while (parent !== null) {
            parent.totalSize += realSize;
            parent = parent?.parent ?? null;
          }
        }

        state.cwd.children.push({
          name: name,
          size: realSize,
          totalSize: realSize,
          parent: state.cwd,
          children: [],
        });
      });
    },
};

function* traverse(tree: TreeNode): Generator<TreeNode> {
  yield tree;
  for (let child of tree.children) {
    yield* traverse(child);
  }
}

export const solve = (input: string) => {
  const tree: TreeNode = {
    name: "/",
    size: 0,
    totalSize: 0,
    parent: null,
    children: [],
  };
  const state: State = { cwd: tree, root: tree };

  const commands = getCommands(input);
  commands.forEach((command) => {
    const [[name, param = ""], ...rest] = parseCommand(command);
    interpreter[name](param, ...rest)(state);
  });

  const totalSpace = 70000000;
  const neededSpace = 30000000;
  const unusedSpace = totalSpace - tree.totalSize;

  let under100000 = 0;
  let smallestToDeleteSize = tree.totalSize;
  for (let node of traverse(tree)) {
    if (node.size === 0 && node.totalSize < 100000)
      under100000 += node.totalSize;

    if (
      node.size === 0 &&
      node.totalSize + unusedSpace >= neededSpace &&
      node.totalSize < smallestToDeleteSize
    )
      smallestToDeleteSize = node.totalSize;
  }

  return [under100000, smallestToDeleteSize];
};
