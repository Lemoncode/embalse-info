import { EmbalsesCuencaPod, getEmbalsesPorCuenca } from "@/pods/embalse-cuenca";
import { cuencas } from "@/core/constants";
import { Metadata } from "next";
import { mapLookupListFromApiToViewModel } from "@/common/mappers";

interface Props {
  params: Promise<{ cuenca: string }>;
}

const getCuencaBySlug = (slug: string) => {
  return Object.values(cuencas).find((cuenca) => cuenca.slug === slug);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cuenca } = await params;
  const datosCuenca = getCuencaBySlug(cuenca);

  if (!datosCuenca) {
    return {};
  }

  return {
    title: `Embalses de ${datosCuenca.nombre}`,
  };
}

export default async function EmbalseCuencaListadoPage({
  params,
}: Props): Promise<React.JSX.Element> {
  const { cuenca } = await params;
  const datosCuenca = getCuencaBySlug(cuenca);

  const embalsesPorCuencaDesdeApi = await getEmbalsesPorCuenca(
    datosCuenca.nombre,
  );
  const embalsesPorCuenca = mapLookupListFromApiToViewModel(
    embalsesPorCuencaDesdeApi,
  );

  return (
    <EmbalsesCuencaPod
      nombreCuenca={datosCuenca.nombre}
      embalses={embalsesPorCuenca}
    />
  );
}
