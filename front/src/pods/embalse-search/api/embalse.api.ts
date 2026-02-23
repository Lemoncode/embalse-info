import "server-only";
import { unstable_cache } from "next/cache";
import { getEmbalsesFromDb } from "../embalse-search.repository";
import { Embalse } from "./api.model";

const getCachedEmbalses = unstable_cache(
  async (): Promise<Embalse[]> => {
    const embalses = await getEmbalsesFromDb();
    if (embalses.length === 0) {
      throw new Error("Empty embalses - skip cache");
    }
    return embalses;
  },
  ["embalses-collection"],
  { revalidate: 300 }
);

export const getEmbalsesCollection = async (): Promise<Embalse[]> => {
  try {
    return await getCachedEmbalses();
  } catch {
    return [];
  }
};
