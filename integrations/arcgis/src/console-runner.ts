import { scrapeSeedEmbalses } from "./integration";

(async () => {
  try {
    console.log("▶ Seed Embalses (ArcGIS) — runner iniciado");

    const apiUrl =
      process.env.API_URL ??
      "https://services-eu1.arcgis.com/RvnYk1PBUJ9rrAuT/arcgis/rest/services/Embalses_Total/FeatureServer/0/query";
    console.log("API_URL:", apiUrl);

    const data = await scrapeSeedEmbalses();

    console.log("✔ Registros:", data.length);
if (data.length > 0) {
  console.log("Todos los registros:");
  console.log(JSON.stringify(data, null, 2));
} else {
      console.log("⚠ No se devolvieron registros. Verifica que el servicio ArcGIS tenga datos en la última fecha.");
    }
  } catch (err: any) {
    console.error("✖ Error:", err?.message ?? err);
    if (err?.response?.data) {
      console.error("Detalles del server:", JSON.stringify(err.response.data, null, 2));
    }
    process.exit(1);
  }
})();