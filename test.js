import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const readPjson = async () => {
  const pjsonPath = fileURLToPath(new URL("./package.json", import.meta.url));

  console.log(await fs.readFile(pjsonPath, "utf-8"));
};

const writeFile = async () => {
  const newFilePath = fileURLToPath(new URL("./demo.js", import.meta.url));

  await fs.writeFile(newFilePath, "This is my demo-file");
};

writeFile();
