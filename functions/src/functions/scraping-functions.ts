import { app, InvocationContext, Timer } from "@azure/functions";
import { dbServer, embalsesRepository } from "@embalse-info/db";

export async function scrapingsFunction(
  myTimer: Timer,
  context: InvocationContext,
): Promise<void> {
  context.log("scrapings-function: START", new Date().toISOString());

  const connectionString = process.env.MONGODB_CONNECTION_STRING;
  if (!connectionString) {
    context.error(
      "scrapings-function: MONGODB_CONNECTION_STRING is NOT SET – aborting",
    );
    throw new Error("MONGODB_CONNECTION_STRING is not set");
  }

  try {
    context.log("scrapings-function: connecting to database...");
    await dbServer.connect(connectionString);
    context.log("scrapings-function: connected to database OK");

    const responseCuencaMediterranea =
      await embalsesRepository.actualizarCuencaMediterranea();

    if (responseCuencaMediterranea) {
      context.log(
        "scrapings-function: Se han actualizado los embalses de la cuenca Mediterránea",
      );
    } else {
      context.log(
        "scrapings-function: No se han podido actualizar los embalses de la cuenca Mediterránea",
      );
    }
  } catch (error) {
    context.error("scrapings-function: ERROR", error);
    throw error;
  } finally {
    context.log("scrapings-function: disconnecting from database...");
    await dbServer.disconnect();
    context.log("scrapings-function: END");
  }
}

app.timer("scrapings-function", {
  retry: {
    strategy: "fixedDelay",
    delayInterval: {
      seconds: 10,
    },
    maxRetryCount: 4,
  },
  schedule: process.env.SCRAPING_SCHEDULE ?? "0 0 */4 * * *", // Every 4 hours
  handler: scrapingsFunction,
});
