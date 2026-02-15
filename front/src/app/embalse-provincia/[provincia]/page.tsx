import Link from "next/link";
import { PROVINCIAS } from "@/core/constants";
import { Card } from "@/common/components/card.component";
import { Metadata } from "next";

interface Props {
  params: Promise<{ provincia: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provincia } = await params;

  const nombreProvincia = PROVINCIAS.find(
    (province) => province.id === provincia,
  )?.name;

  return {
    title: `Embalses de ${nombreProvincia}`,
  };
}

export default async function EmbalseProvinciaListadoPage({ params }: Props) {
  const { provincia } = await params;

  const nombreProvincia = PROVINCIAS.find(
    (province) => province.id === provincia,
  )?.name;

  const reservoirs = [
    { id: "ullibarri-gamboa", name: "Ullibarri-Gamboa" },
    { id: "zadorra", name: "Zadorra" },
    { id: "urrúnaga", name: "Urrunaga" },
    { id: "maroño", name: "Maroño" },
    { id: "albina", name: "Albina" },
    { id: "santa-engracia", name: "Santa Engracia" },
  ];

  return (
    <Card>
      <h2>Embalses de {nombreProvincia}</h2>

      {reservoirs.map(({ id, name }) => (
        <Link key={id} href={`/embalse/${id}`} className="link-accessible">
          {name}
        </Link>
      ))}
      <img
        className="mt-4 w-full rounded-xl sm:w-1/2 lg:w-1/3"
        src="/images/embalse-generico.jpg"
        alt="Mapa de embalses"
      />
    </Card>
  );
}
