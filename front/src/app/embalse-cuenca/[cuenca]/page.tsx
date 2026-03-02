import { EmbalsesCuencaPod, getEmbalsesPorCuenca } from "@/pods/embalse-cuenca";
import { cuencas } from "@/core/constants/cuencas.constants";
import { Metadata } from "next";
import { mapRiverBasinListFromApiToView } from "@/pods/embalse-cuenca-list/embalse-cuenca.mapper";

interface Props {
  params: Promise<{ cuenca: string }>;
}

const getCuencaBySlug = (slug: string) => {
  return Object.values(cuencas).find((cuenca) => cuenca.slug === slug);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cuenca } = await params;
  const datosCuenca = getCuencaBySlug(cuenca.toString());

  return {
    title: `Embalses de ${datosCuenca.nombre}`,
  };
}

export default async function EmbalseCuencaListadoPage({
  params,
}: Props): Promise<React.JSX.Element> {
  const { cuenca } = await params;
  const datosCuenca = getCuencaBySlug(cuenca.toString());
  const embalsesByRiverBasinFromApi = await getEmbalsesPorCuenca(
    datosCuenca.nombre,
  );
  const embalsesByRiverBasinLookup = mapRiverBasinListFromApiToView(
    embalsesByRiverBasinFromApi,
  );

  if (!cuenca) {
    return <div>Cuenca no encontrada</div>;
  }

  return (
    <EmbalsesCuencaPod
      nombreCuenca={datosCuenca.nombre}
      slug={datosCuenca.slug}
      embalses={embalsesByRiverBasinLookup}
    />
  );
}
