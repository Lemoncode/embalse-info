import prompts from "prompts";
import { getDirectories } from "./helpers";

const integrations = await getDirectories("integrations");

const { projects }: { projects: string[] } = await prompts({
  type: "autocompleteMultiselect",
  name: "projects",
  message: "[start] Select projects to run",
  choices: [
    ...integrations.map((integration) => ({
      title: `integrations/${integration}`,
      value: integration, // value of the package.json name
    })),
    { title: "front", value: "front" },
    { title: "functions", value: "functions" },
  ],
});

if (projects.length === 0) {
  console.log("No projects selected. Exiting.");
  process.exit(0);
}

const filter = projects.map((project) => `--filter=${project}`).join(" ");

export const command = `turbo run start ${filter}`;
