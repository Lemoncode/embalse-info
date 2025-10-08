import { app, InvocationContext, Timer } from "@azure/functions";
import { dbServer } from "@embalse-info/db";

export async function arcgisFunction(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  await dbServer.connect(
    process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017"
  );
  context.log("ArcGIS function executed at:", new Date().toISOString());

  await dbServer.db?.collection("test").insertOne({ test: "data" });

  await dbServer.disconnect();
}

app.timer("arcgis-function", {
  schedule: "0 * * * * *",
  handler: arcgisFunction,
});
