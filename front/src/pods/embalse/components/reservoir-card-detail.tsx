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
        <li>Municipio: {datosEmbalse.municipio}</li>
        <li>Río: {datosEmbalse.rio}</li>
        <li>Embalses Aguas Abajo: {datosEmbalse.embalsesAguasAbajo}</li>
        <li>Tipo de Presa: {datosEmbalse.tipoDePresa}</li>
        <li>Año de Construcción: {datosEmbalse.anioConstruccion}</li>
        <li>Superficie: {datosEmbalse.superficie} </li>
        <li>Localización: {datosEmbalse.localizacion}</li>
      </ul>
    </div>
  );
};
