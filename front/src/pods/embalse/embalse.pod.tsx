import React from "react";
import { Embalse } from "./embalse.component";
import { ReservoirData } from "./embalse.vm";

interface Props {
  reservoirData: ReservoirData;
}

export const EmbalsePod: React.FC<Props> = (props) => {
  const { reservoirData } = props;

  return <Embalse reservoirData={reservoirData} />;
};
