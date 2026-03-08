import { Lookup } from "@/common/models";
import { EmbalseApi } from "./embalse-provincia.api-model";

export const mapEmbalseListFromApiToLookup = (
  embalses: EmbalseApi[]
): Lookup[] =>
  Array.isArray(embalses)
    ? embalses.map((embalse) => ({
        id: embalse._id,
        text: embalse.name,
        name: embalse.name,
      }))
    : [];