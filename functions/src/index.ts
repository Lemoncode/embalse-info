import { app } from "@azure/functions";

app.setup({
  enableHttpStream: true,
});

import "./functions/arcgis-function.js";
import "./functions/scraping-function.js";
