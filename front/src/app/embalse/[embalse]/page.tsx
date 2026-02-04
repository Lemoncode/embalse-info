import { notFound } from "next/navigation";
import { EmbalsePod } from "@/pods/embalse";
import { getEmbalseBySlug } from "@/pods/embalse/embalse.repository";
import { mapEmbalseToReservoirData } from "@/pods/embalse/embalse.mapper";
export const revalidate = 300; // ISR: regenerar cada 5 minutos
interface Props {
  params: Promise<{ embalse: string }>;
}
export default async function EmbalseDetallePage({ params }: Props) {
  /**
   * Llamamos a getEmbalseBySlug con el slug de la URL.
    Si no se encuentra el embalse, llamamos a notFound() que muestra la pagina 404 de Next.js 
  */
  const { embalse } = await params;
  const embalseDoc = await getEmbalseBySlug(embalse);
  if (!embalseDoc) {
    notFound();
  }
  //mapeamos el documento a ReservoirData y lo pasamos al pod
  const reservoirData = mapEmbalseToReservoirData(embalseDoc);
  return <EmbalsePod reservoirData={reservoirData} />;
}