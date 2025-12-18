import Link from "next/link";
import { PROVINCIAS } from "@/core/constants";

interface Props {
  params: Promise<{ provincia: string }>;
}

export default async function EmbalseProvinciaListadoPage({ params }: Props) {
  const { provincia } = await params;

  const nombreProvincia = PROVINCIAS.find(
    (province) => province.id === provincia,
  )?.name;

  return (
    <div className="flex flex-col gap-8">
      <h2>Embalses de {nombreProvincia}</h2>

      <Link href="/embalse/casasola" className="link-accessible">
        Embalse de Casasola
      </Link>
    </div>
  );
}
