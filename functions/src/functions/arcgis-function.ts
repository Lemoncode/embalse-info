import { app, InvocationContext, Timer } from "@azure/functions";
import { dbServer, embalsesRepository } from "@embalse-info/db";

export async function arcgisFunction(
  myTimer: Timer,
  context: InvocationContext,
): Promise<void> {
  context.log("arcgis-function: START", new Date().toISOString());

  const connectionString = process.env.MONGODB_CONNECTION_STRING;
  if (!connectionString) {
    context.error(
      "arcgis-function: MONGODB_CONNECTION_STRING is NOT SET – aborting",
    );
    throw new Error("MONGODB_CONNECTION_STRING is not set");
  }

  try {
    context.log("arcgis-function: connecting to database...");
    await dbServer.connect(connectionString);
    context.log("arcgis-function: connected to database OK");

    const response = await embalsesRepository.actualizarEmbalses();

    if (response) {
      context.log("arcgis-function: Se han actualizado los embalses");
    } else {
      context.log(
        "arcgis-function: No se han podido actualizar los embalses",
      );
    }
  } catch (error) {
    context.error("arcgis-function: ERROR", error);
    throw error;
  } finally {
    context.log("arcgis-function: END");
  }
}

app.timer("arcgis-function", {
  // Run once immediately when the Function App instance starts (deploy/restart/scale-out)
  runOnStartup: true,
  retry: {
    strategy: "fixedDelay",
    delayInterval: {
      seconds: 10,
    },
    maxRetryCount: 4,
  },
  schedule: process.env.ARCGIS_SCHEDULE ?? "0 0 3 * * Mon,Thu", // Twice per week
  handler: arcgisFunction,
});
