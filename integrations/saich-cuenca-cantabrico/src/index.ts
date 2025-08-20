import { buildServer } from "./api/server.js";
import { CONFIG } from "./config/env.js";

const app = buildServer();
app.listen(CONFIG.PORT, () => {
  console.log(`Listening on http://localhost:${CONFIG.PORT}`);
  console.log(`GET /api/cantabrico?onlyEmbalses=true`);
});
