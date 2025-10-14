import prompts from "prompts";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import { dbServer } from "#core/servers/index.js";
import { mongoDBQuestion } from "./questions.js";
import { filterChoices } from "./helpers.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const consoleRunners = await fs
  .readdir(__dirname, { withFileTypes: true })
  .then((files) =>
    files.filter((file) => file.isDirectory()).map((file) => file.name)
  );

let exit = false;
const mongoDbFields = await prompts(mongoDBQuestion);
const connectionString = Boolean(mongoDbFields.connectionString)
  ? mongoDbFields.connectionString
  : process.env.MONGODB_CONNECTION_STRING;
await dbServer.connect(connectionString);
while (!exit) {
  const { consoleRunner } = await prompts([
    {
      name: "consoleRunner",
      type: "select",
      message: "Which test-runner do you want to run?",
      choices: [...consoleRunners, "exit"].map((option) => ({
        title: option,
        value: option,
      })),
      suggest: filterChoices,
    },
  ]);

  if (consoleRunner !== "exit") {
    const { run } = await import(`./${consoleRunner}/index.js`);
    await run();
  } else {
    exit = true;
    await dbServer.disconnect();
  }
}
