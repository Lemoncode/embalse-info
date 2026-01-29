import React from "react";
import { Embalse } from "./embalse.component";

interface Props {
  embalse: string;
}

export const EmbalsePod: React.FC<Props> = (props) => {
  const { embalse } = props;

  return <Embalse embalse={embalse} />;
};
