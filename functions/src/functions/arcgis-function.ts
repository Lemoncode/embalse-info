import { app, InvocationContext, Timer } from "@azure/functions";

export async function arcgisFunction(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  context.log("ArcGIS function executed at:", new Date().toISOString());
}

app.timer("arcgis-function", {
  schedule: "0 * * * * *",
  handler: arcgisFunction,
});
