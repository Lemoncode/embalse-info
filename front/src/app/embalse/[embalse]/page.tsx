import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  EmbalsePod,
  getReservoirInfoBySlugCached,
  getEmbalseBySlugCached,
} from "@/pods/embalse";
import { mapEmbalseToReservoirData } from "@/pods/embalse/embalse.mapper";
import {
  EmbalseHistorialPod,
  getPromedioHistoricoPorMeses,
  ReservoirHistoryModel,
} from "@/pods/embalse-historial";

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

  if (!embalseDoc) {
    notFound();
  }

  const reservoirData = mapEmbalseToReservoirData(embalseDoc, embalseInfo);

  /**
   * Obtiene historial de agua embalsada del último año por meses según nombre de embalse recibido.
   */

  const reservoirHistoryLastYear: ReservoirHistoryModel =
    await getPromedioHistoricoPorMeses(embalseDoc.nombre);

  return (
    <>
      <EmbalseHistorialPod
        reservoirHistoryLastYear={reservoirHistoryLastYear}
        maxCapacity={embalseDoc.capacidad}
      />
      <EmbalsePod reservoirData={reservoirData} />
    </>
  );
}
