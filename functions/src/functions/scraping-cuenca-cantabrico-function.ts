import { app, InvocationContext, Timer } from "@azure/functions";

export async function scrapingCuencaCantabricoFunction(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  context.log(
    "Scraping Cuenca Cantábrico function executed at:",
    new Date().toISOString()
  );
}

// Registrar la función timer que se ejecuta cada minuto
app.timer("scraping-cuenca-cantabrico-function", {
  schedule: "0 * * * * *", // Cada minuto
  handler: scrapingCuencaCantabricoFunction,
});
