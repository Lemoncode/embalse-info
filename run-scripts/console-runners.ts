import fs from "node:fs";
import prompts from "prompts";

const CONSOLE_RUNNERS_DB = fs.existsSync("packages/db/src/console-runners");

const { selected }: { selected: string } = await prompts({
  type: "autocomplete",
  name: "selected",
  message: "[console-runners] Select a console runner to execute",
  choices: CONSOLE_RUNNERS_DB
    ? [{ title: "packages/db", value: "@embalse-info/db" }]
    : [],
});

export const command =
  selected && `npm run start:console-runners -w ${selected}`;
