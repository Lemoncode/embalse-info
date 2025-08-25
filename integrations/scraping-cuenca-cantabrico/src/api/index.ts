import axios from "axios";

export type SaichFeature = {
  type: "Feature";
  properties?: Record<string, unknown>;
};

export type SaichPayload = {
  success: boolean;
  data: { type: "FeatureCollection"; features: SaichFeature[] };
};

const REMOTE_URL = "https://visor.saichcantabrico.es/wp-admin/admin-ajax.php";

/** Llama al endpoint SAICH para EMBALSES */
export async function getCantabricoPayload(): Promise<SaichPayload> {
  const body = new URLSearchParams({
    action: "peticion_cincominutal",
    tipo: "embalses",
  });

  const { data } = await axios.post<SaichPayload>(REMOTE_URL, body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Accept: "application/json,text/plain,*/*",
    },
  });

  if (!data?.success || data?.data?.type !== "FeatureCollection" || !Array.isArray(data?.data?.features)) {
    throw new Error("Respuesta inesperada del origen (no es FeatureCollection)");
  }
  return data;
}
