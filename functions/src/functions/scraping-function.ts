import { app, InvocationContext, Timer } from "@azure/functions";

export async function scrapingsFunction(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  context.log("Scrapings executed at:", new Date().toISOString());
}

app.timer("scrapings-function", {
  schedule: "0 * * * * *",
  handler: scrapingsFunction,
});
