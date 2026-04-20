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
    <Card className="mx-auto w-full pt-6 pr-4 pb-6 pl-4 md:max-w-225 md:p-8">
      <div className="bg-base-100 rounded-2xl p-6">
        {embalses.length === 0 ? (
          <h2>No se encontraron embalses para {nombreProvincia}</h2>
        ) : (
          <h2>Embalses de {nombreProvincia}</h2>
        )}
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3">
          {embalses.map(({ id, name }) => (
            <Link key={id} href={`/embalse/${id}`} className="link-accessible">
              {name}
            </Link>
          ))}
        </div>
        <img
          className="mt-4 w-full rounded-xl md:aspect-434/171"
          src="/images/embalse-generico.jpg"
          alt={`Mapa de ubicación de embalses de ${nombreProvincia}`}
        />
      </div>
    </Card>
  );
};
