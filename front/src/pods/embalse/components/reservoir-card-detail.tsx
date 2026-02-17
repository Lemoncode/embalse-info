import React from "react";
import { DatosEmbalse } from "../embalse.vm";

interface Props {
  datosEmbalse: DatosEmbalse;
}

export const ReservoirCardDetail: React.FC<Props> = (props) => {
  const { datosEmbalse } = props;
  return (
    <section className="flex w-full flex-col items-start gap-4" aria-labelledby="data-title">
      <h3 id="data-title">Datos del embalse</h3>
      <dl className="space-y-2">
        <div><dt className="inline font-semibold">Cuenca:</dt> <dd className="inline">{datosEmbalse.cuenca}</dd></div>
        <div><dt className="inline font-semibold">Provincia:</dt> <dd className="inline">{datosEmbalse.provincia}</dd></div>
        <div><dt className="inline font-semibold">Municipio:</dt> <dd className="inline">{datosEmbalse.municipio}</dd></div>
        <div><dt className="inline font-semibold">Río:</dt> <dd className="inline">{datosEmbalse.rio}</dd></div>
        <div><dt className="inline font-semibold">Embalses Aguas Abajo:</dt> <dd className="inline">{datosEmbalse.embalsesAguasAbajo}</dd></div>
        <div><dt className="inline font-semibold">Tipo de Presa:</dt> <dd className="inline">{datosEmbalse.tipoDePresa}</dd></div>
        <div><dt className="inline font-semibold">Año de Construcción:</dt> <dd className="inline">{datosEmbalse.anioConstruccion}</dd></div>
        <div><dt className="inline font-semibold">Superficie:</dt> <dd className="inline">{datosEmbalse.superficie}</dd></div>
        <div><dt className="inline font-semibold">Localización:</dt> <dd className="inline">{datosEmbalse.localizacion}</dd></div>
      </dl>
    </section>
  );
};
