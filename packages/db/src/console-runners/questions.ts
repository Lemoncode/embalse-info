import type { PromptObject } from "prompts";

export const mongoDBQuestion: PromptObject<"connectionString"> = {
  name: "connectionString",
  type: "text",
  message: "Connection string (Press enter to use default): ",
  initial: process.env.MONGODB_CONNECTION_STRING,
};
