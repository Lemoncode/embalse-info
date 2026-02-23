import { PROVINCIAS } from "@/core/constants";
import { EmbalseProvinciaPod } from "@/pods/embalse-provincia";
import { mapEmbalseListFromApiToLookup } from "@/pods/embalse-provincia/embalse-provincia.mapper";
import { getEmbalsesByProvince } from "@/pods/embalse-provincia/embalse-provincia.repository";
import { Metadata } from "next";

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

  const embalsesByProvinceFromApi = await getEmbalsesByProvince(provincia);

  const embalsesByProvinceLookup = mapEmbalseListFromApiToLookup(embalsesByProvinceFromApi);
  console.log('embalsesLookup:', embalsesByProvinceLookup);

  return (
    <EmbalseProvinciaPod
      nombreProvincia={nombreProvincia}
      embalses={embalsesByProvinceLookup}
    />
  );
}
