import React from "react";
import { DatosEmbalse } from "../embalse.vm";

interface Props {
  datosEmbalse: DatosEmbalse;
}

export const ReservoirCardDetail: React.FC<Props> = (props) => {
  const { datosEmbalse } = props;
  return (
    <section
      className="flex w-full flex-col items-start gap-4"
      aria-labelledby="data-title"
    >
      <h3 id="data-title">Datos del embalse</h3>
      <dl className="space-y-2">
        <div>
          <dt className="inline font-semibold">Cuenca:</dt>{" "}
          <dd className="inline">{datosEmbalse.cuenca}</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Provincia:</dt>{" "}
          <dd className="inline">{datosEmbalse.provincia}</dd>
        </div>
        <div>
          <dt className="inline font-semibold">Uso:</dt>{" "}
          <dd className="inline">{datosEmbalse.uso}</dd>
        </div>
      </dl>
    </section>
  );
};
