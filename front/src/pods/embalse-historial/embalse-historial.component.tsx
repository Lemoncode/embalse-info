"use client";
import React from "react";
import { ReservoirHistoryModel } from "./embalse-historial.vm";

interface Props {
  statisticsLastYear: ReservoirHistoryModel;
}
export const EmbalseHistorialComponent: React.FC<Props> = (props) => {
  const { statisticsLastYear } = props;

  return <div>EmbalseHistorialComponent</div>;
};
