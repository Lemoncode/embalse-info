import { Lookup } from "@/common/models";
import React from "react";
import { EmbalseProvincia } from "./embalse-provincia.component";

interface Props {
  nombreProvincia: string;
  embalses: Lookup[];
}

export const EmbalseProvinciaPod: React.FC<Props> = (props) => {
  const { nombreProvincia, embalses } = props;
  return (
    <EmbalseProvincia nombreProvincia={nombreProvincia} embalses={embalses} />
  );
};
