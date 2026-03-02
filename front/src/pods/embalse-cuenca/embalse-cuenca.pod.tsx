import React from "react";
import { EmbalseCuencaComponent } from "./embalse-cuenca.component";
import { CuencasModel } from "@/common/models";

export interface Props {
  nombreCuenca: string;
  slug: string;
  embalses: CuencasModel[];
}
export const EmbalsesCuencaPod: React.FC<Props> = (props) => {
  const { nombreCuenca, slug, embalses } = props;
  return (
    <EmbalseCuencaComponent
      nombreCuenca={nombreCuenca}
      slug={slug}
      embalses={embalses}
    />
  );
};
