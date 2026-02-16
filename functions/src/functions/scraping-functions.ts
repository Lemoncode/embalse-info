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

    const responseCuencaCantabrico = await embalsesRepository.actualizarCuencaCantabrico();

    const responseCuencaCatalana = await embalsesRepository.actualizarCuencaCatalana();

    if (responseCuencaMediterranea) {
      context.log(
        "scrapings-function: Se han actualizado los embalses de la cuenca Mediterránea",
      );
    } else {
      context.log(
        "scrapings-function: No se han podido actualizar los embalses de la cuenca Mediterránea",
      );
    }

    if (responseCuencaCantabrico) {
      context.log(`Se han actualizado los embalses de la cuenca Cantábrica`);
    } else {
      context.log(
        "No se han podido actualizar los embalses de la cuenca Cantábrica"
      );
    }

    if (responseCuencaCatalana) {
      context.log(`Se han actualizado los embalses de la cuenca Catalana`);
    } else {
      context.log(
        "No se han podido actualizar los embalses de la cuenca Catalana"
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



  await dbServer.disconnect();
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
