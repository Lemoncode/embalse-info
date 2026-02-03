import { Embalse } from "./api.model";
import { embalseSearchMock } from "./embalse-search.mock";

export const getEmbalsesCollection = async (): Promise<Embalse[]> => {
  return embalseSearchMock;
};
