import { app } from "@azure/functions";

app.setup({
  enableHttpStream: true,
});

import "./functions/arcgis-function";
import "./functions/scraping-cuenca-cantabrico-function";
