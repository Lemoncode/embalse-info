import Link from "next/link";
import { PROVINCIAS } from "@/core/constants";
import { EMBALSES } from "@/core/constants/reservoir.constants";
import { Card } from "@/common/components/card.component";

interface Props {
  params: Promise<{ provincia: string }>;
}

export default async function EmbalseProvinciaListadoPage({ params }: Props) {
  const { provincia } = await params;

  const nombreProvincia = PROVINCIAS.find(
    (province) => province.id === provincia,
  )?.name;

  const embalsesProvincia = EMBALSES.filter(
    (embalse) => embalse.provinciaId === provincia,
  );

  return (
    <Card>
      <h2>Embalses de {nombreProvincia}</h2>

      {embalsesProvincia.map(({ id, name }) => (
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
