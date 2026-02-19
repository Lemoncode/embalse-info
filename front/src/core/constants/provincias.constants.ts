import { provinces } from "db-model";
import { Lookup } from "@/common/models";

export const PROVINCIAS: Lookup[] = Object.values(provinces).map(
  ({ slug, name }) => ({ id: slug, name })
);
