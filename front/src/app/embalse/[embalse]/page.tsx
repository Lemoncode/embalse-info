import { notFound } from "next/navigation";
import { EmbalsePod, getReservoirInfoBySlugCached } from "@/pods/embalse";
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
  const embalseInfo = await getReservoirInfoBySlugCached(embalse);
  
  if (!embalseDoc || !embalseInfo) {
    notFound();
  }
  const reservoirData = mapEmbalseToReservoirData(embalseDoc, embalseInfo);
  console.log("Reservoir Data:", reservoirData); // Verificar los datos antes de renderizar
  //todo mapper reservoirIInfo
  return <EmbalsePod reservoirData={reservoirData} />;
}