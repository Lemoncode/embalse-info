import { PROVINCIAS } from "@/core/constants";
import { EmbalseProvinciaPod } from "@/pods/embalse-provincia";
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

  // TODO: Reemplazar con datos reales obtenidos de la API
  const reservoirs = [
    { id: "ullibarri-gamboa", name: "Ullibarri-Gamboa" },
    { id: "zadorra", name: "Zadorra" },
    { id: "urrúnaga", name: "Urrunaga" },
    { id: "maroño", name: "Maroño" },
    { id: "albina", name: "Albina" },
    { id: "santa-engracia", name: "Santa Engracia" },
  ];

  return (
    <EmbalseProvinciaPod
      nombreProvincia={nombreProvincia}
      embalses={reservoirs}
    />
  );
}
