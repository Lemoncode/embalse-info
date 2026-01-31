import { notFound } from "next/navigation";
import { EmbalsePod } from "@/pods/embalse";
import { getEmbalseBySlug } from "@/pods/embalse/embalse.repository";
import { mapEmbalseToReservoirData } from "@/pods/embalse/embalse.mapper";

export const revalidate = 300; // ISR: regenerar cada 5 minutos

interface Props {
  params: Promise<{ embalse: string }>;
}

export default async function EmbalseDetallePage({ params }: Props) {
  const { embalse } = await params;

  const embalseDoc = await getEmbalseBySlug(embalse);

  if (!embalseDoc) {
    notFound();
  }

  const reservoirData = mapEmbalseToReservoirData(embalseDoc);

  return <EmbalsePod reservoirData={reservoirData} />;
}
