import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  EmbalsePod,
  getReservoirInfoBySlugCached,
  getEmbalseBySlugCached,
  getAverageLastYearByMonthCached,
  getAverageHistoricalByMonthCached,
} from "@/pods/embalse";
import {
  mapReservoirLastYearToViewModel,
  mapEmbalseToReservoirData,
  mapHistoricalReservoirToViewModel,
} from "@/pods/embalse/embalse.mapper";

export const revalidate = 300; // ISR: regenerar cada 5 minutos

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { embalse } = await params;
  const embalseSlug = await getEmbalseBySlugCached(embalse);

  return {
    title: embalseSlug.nombre,
  };
}

interface Props {
  params: Promise<{ embalse: string }>;
}

export default async function EmbalseDetallePage({ params }: Props) {
  /**
   * Llamamos a getEmbalseBySlug con el slug de la URL.
    Si no se encuentra el embalse, llamamos a notFound() que muestra la pagina 404 de Next.js 
  */
  const { embalse } = await params;
  const embalseDoc = await getEmbalseBySlugCached(embalse);
  const embalseInfo = await getReservoirInfoBySlugCached(embalse);
  const actualMonth = new Date().getMonth(); // return month 0-11

  if (!embalseDoc) {
    notFound();
  }
  const reservoirData = mapEmbalseToReservoirData(embalseDoc, embalseInfo);

  const dataMappedOneYearAgo = await getAverageLastYearByMonthCached(
    embalseDoc.nombre,
    actualMonth + 1,
  ).then(mapReservoirLastYearToViewModel);

  const averageHistoricalData = await getAverageHistoricalByMonthCached(
    embalseDoc.nombre,
    actualMonth + 1,
  ).then(mapHistoricalReservoirToViewModel);

  return (
    <>
      <EmbalsePod
        reservoirData={reservoirData}
        dataOneYearAgo={dataMappedOneYearAgo}
        dataTenYearsAgo={averageHistoricalData}
      />
    </>
  );
}
