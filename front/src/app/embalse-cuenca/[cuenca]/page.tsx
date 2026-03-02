import { EmbalsesCuencaPod, getEmbalsesPorCuenca } from "@/pods/embalse-cuenca";
import { cuencas } from "@/core/constants/cuencas.constants";
import { Metadata } from "next";
import { mapListaCuencasDesdeApiParaVista } from "@/pods/embalse-cuenca-list/embalse-cuenca.mapper";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ cuenca: string }>;
}

const getCuencaBySlug = (slug: string) => {
  return Object.values(cuencas).find((cuenca) => cuenca.slug === slug);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cuenca } = await params;
  const datosCuenca = getCuencaBySlug(cuenca.toString());

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
  const datosCuenca = getCuencaBySlug(cuenca.toString());
  if (!datosCuenca) {
    notFound();
  }
  const embalsesPorCuencaDesdeApi = await getEmbalsesPorCuenca(
    datosCuenca.nombre,
  );
  const embalsesPorCuenca = mapListaCuencasDesdeApiParaVista(
    embalsesPorCuencaDesdeApi,
  );

  return (
    <EmbalsesCuencaPod
      nombreCuenca={datosCuenca.nombre}
      slug={datosCuenca.slug}
      embalses={embalsesPorCuenca}
    />
  );
}
