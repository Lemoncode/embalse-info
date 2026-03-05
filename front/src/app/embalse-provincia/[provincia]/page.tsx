import { PROVINCIAS } from "@/core/constants";
import {
  EmbalseProvinciaPod,
  getEmbalsesByProvince,
} from "@/pods/embalse-provincia";
import { mapEmbalseListFromApiToLookup } from "@/pods/embalse-provincia/embalse-provincia.mapper";
import { Metadata } from "next";

export const revalidate = 300; // ISR: regenerar cada 5 minutos

interface Props {
  params: Promise<{ provincia: string }>;
}

const getNombreProvincia = (id: string): string =>
  PROVINCIAS.find((p) => p.id === id)?.name ?? "Provincia";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provincia } = await params;

  const nombreProvincia = getNombreProvincia(provincia);

  return {
    title: `Embalses de ${nombreProvincia}`,
  };
}

export default async function EmbalseProvinciaListadoPage({ params }: Props) {
  const { provincia } = await params;

  const nombreProvincia = getNombreProvincia(provincia);
  const embalsesByProvinceFromApi =
    await getEmbalsesByProvince(nombreProvincia);

  const embalsesByProvinceLookup = mapEmbalseListFromApiToLookup(
    embalsesByProvinceFromApi,
  );

  return (
    <EmbalseProvinciaPod
      nombreProvincia={nombreProvincia}
      embalses={embalsesByProvinceLookup}
    />
  );
}
