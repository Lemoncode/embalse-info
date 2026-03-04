import React from "react";
import { EmbalseCuencaComponent } from "./embalse-cuenca.component";
import { Lookup } from "@/common/models";

export interface Props {
  nombreCuenca: string;
  embalses: Lookup[];
}
export const EmbalsesCuencaPod: React.FC<Props> = (props) => {
  const { nombreCuenca, embalses } = props;
  return (
    <EmbalseCuencaComponent nombreCuenca={nombreCuenca} embalses={embalses} />
  );
};
