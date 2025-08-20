// Cliente HTTP crudo al endpoint SAICH (sin acoplar al dominio)

const REMOTE_URL = "https://visor.saichcantabrico.es/wp-admin/admin-ajax.php";

export interface SaichFeature {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [string | number, string | number] };
  properties: Record<string, unknown>;
}

export interface SaichPayload {
  success: boolean;
  data: { type: "FeatureCollection"; features: SaichFeature[] };
}

export class SaichHttpClient {
  constructor(
    private timeoutMs = 15000,
    private retries = 2
  ) {}

  private async fetchWithRetry(init: RequestInit): Promise<Response> {
    let lastErr: unknown;
    for (let i = 0; i <= this.retries; i++) {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), this.timeoutMs);
      try {
        const res = await fetch(REMOTE_URL, { ...init, signal: controller.signal });
        clearTimeout(id);
        if (res.ok) return res;
        lastErr = new Error(`HTTP ${res.status} ${res.statusText}`);
      } catch (e) {
        lastErr = e;
      } finally {
        clearTimeout(id);
      }
      if (i < this.retries) await new Promise(r => setTimeout(r, 200 * 2 ** i));
    }
    throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
  }

  // 👇 MÉTODO NUEVO AÑADIDO
  async getFiveMinuteEmbalses(): Promise<SaichPayload> {
    // La única diferencia es el valor de 'tipo'
    const body = new URLSearchParams({ action: "peticion_cincominutal", tipo: "embalses" });
    const res = await this.fetchWithRetry({
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Node fetch)",
        "Accept": "application/json,text/plain,*/*",
      },
      body
    });
    const json = (await res.json()) as SaichPayload;
    if (!json?.success || json?.data?.type !== "FeatureCollection" || !Array.isArray(json?.data?.features)) {
      throw new Error("Respuesta inesperada del origen (no es FeatureCollection)");
    }
    return json;
  }
}
