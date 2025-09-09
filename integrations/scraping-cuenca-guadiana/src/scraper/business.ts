import { EmbalsesGuadiana, getCuencaJSONResponse } from "@/api";

export async function extractCurrentDate(URL: string): Promise<string> {
  const data: EmbalsesGuadiana[] = await getCuencaJSONResponse(URL);

  if (data && data.length > 0) {
    return data[0].timestamp.split(" ")[0].replace(/-/g, "/");
  }

  return "Fecha no disponible";
}
