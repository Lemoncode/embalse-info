import express from "express";
import { GetCantabricoDataUseCase } from "../application/GetCantabricoDataUseCase.js";
import { SaichRepository } from "../infrastructure/SaichRepository.js";
import { SaichHttpClient } from "../infrastructure/SaichHttpClient.js";
import { CONFIG } from "../config/env.js";

export function buildServer() {
  const app = express();

  const client = new SaichHttpClient(CONFIG.TIMEOUT_MS, CONFIG.RETRIES);
  const repo = new SaichRepository(client);
  const useCase = new GetCantabricoDataUseCase(repo);

  app.get("/api/cantabrico", async (req, res) => {
    try {
      const onlyEmbalses = String(req.query.onlyEmbalses ?? "false") === "true";
      const snapshot = await useCase.execute({ onlyEmbalses });
      // JSON “ordenado” del dominio
      res.set("Cache-Control", "public, max-age=60");
      res.json(snapshot);
    } catch (e) {
      console.error(e);
      res.status(502).json({ ok: false, error: "No se pudieron obtener datos" });
    }
  });

  // healthcheck
  app.get("/healthz", (_req, res) => res.json({ ok: true }));

  return app;
}
