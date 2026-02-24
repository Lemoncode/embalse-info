import { Card } from "@/common/components/card.component";
import { Lookup } from "@/common/models";
import Link from "next/link";
import React from "react";

interface Props {
  nombreProvincia: string;
  embalses: Lookup[];
}

export const EmbalseProvincia: React.FC<Props> = (props) => {
  const { nombreProvincia, embalses } = props;
  return (
    <Card>
      {embalses.length === 0 ? (
        <h2>No se encontraron embalses para {nombreProvincia}</h2>
      ) : (
        <h2>Embalses de {nombreProvincia}</h2>
      )}

      {embalses.map(({ id, name }) => (
        <Link key={id} href={`/embalse/${id}`} className="link-accessible">
          {name}
        </Link>
      ))}
      <img
        className="mt-4 w-full rounded-xl sm:w-1/2 lg:w-1/3"
        src="/images/embalse-generico.jpg"
        alt={`Mapa de ubicación de embalses de ${nombreProvincia}`}
      />
    </Card>
  );
};
