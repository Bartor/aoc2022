import { readFile } from "fs/promises";

const main = async () => {
  const [, , day, inputFile] = process.argv;
  const { solve } = await import(`./day${day}`);
  const input = await readFile(inputFile, "utf-8");
  console.log(solve(input));
};

main().catch(console.log);
