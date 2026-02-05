import { getEmbalsesFromDb } from "../embalse-search.repository";
import { Embalse } from "./api.model";

export const getEmbalsesCollection = async (): Promise<Embalse[]> => {
  return getEmbalsesFromDb();
};
