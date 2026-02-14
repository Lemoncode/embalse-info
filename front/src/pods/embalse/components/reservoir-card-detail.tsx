import React from "react";
import { DatosEmbalse } from "../embalse.vm";

interface Props {
  datosEmbalse: DatosEmbalse;
}

export const ReservoirCardDetail: React.FC<Props> = (props) => {
  const { datosEmbalse } = props;
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h3>Datos del embalse</h3>
      <ul>
        <li>Cuenca: {datosEmbalse.cuenca}</li>
        <li>Provincia: {datosEmbalse.provincia}</li>
        <li>Uso: {datosEmbalse.uso}</li>
      </ul>
    </div>
  );
};
