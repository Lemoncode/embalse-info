import { app, InvocationContext, Timer } from "@azure/functions";
import { dbServer, embalsesRepository } from "@embalse-info/db";

export async function scrapingsFunction(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  await dbServer.connect(process.env.MONGODB_CONNECTION_STRING as string);
  context.log("Scrapings function executed at:", new Date().toISOString());

  const responseCuencaMediterranea =
    await embalsesRepository.actualizarCuencaMediterranea();

  const responseCuencaDuero = await embalsesRepository.actualizarCuencaDuero()

  if (responseCuencaMediterranea) {
    context.log(`Se han actualizado los embalses de la cuenca Mediterránea`);
  } else {
    context.log(
      "No se han podido actualizar los embalses de la cuenca Mediterránea"
    );
  }

  if (responseCuencaDuero) {
    context.log(`Se han actualizado los embalses de la cuenca Duero`);
  } else {
    context.log(
      "No se han podido actualizar los embalses de la cuenca Duero"
    );
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
  schedule: "40 * * * * *",
  handler: scrapingsFunction,
});
