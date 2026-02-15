import { app, InvocationContext, Timer } from "@azure/functions";
import { dbServer, embalsesRepository } from "@embalse-info/db";

export async function arcgisFunction(
  myTimer: Timer,
  context: InvocationContext,
): Promise<void> {
  await dbServer.connect(process.env.MONGODB_CONNECTION_STRING as string);
  context.log("ArcGIS function executed at:", new Date().toISOString());

  const response = await embalsesRepository.actualizarEmbalses();

  if (response) {
    context.log(`Se han actualizado los embalses`);
  } else {
    context.log("No se han podido actualizar los embalses");
  }
  await dbServer.disconnect();
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
