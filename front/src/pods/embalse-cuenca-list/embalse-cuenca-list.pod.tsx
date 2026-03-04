import React from "react";
import { EmbalsesCuencaList } from "./embalse-cuenca-list.component";
import { Lookup } from "@/common/models";

interface Props {
  cuencaList: Lookup[];
}

export const EmbalseCuencaListPod: React.FC<Props> = async (props) => {
  const { cuencaList } = props;
  return <EmbalsesCuencaList cuencaList={cuencaList} />;
};
