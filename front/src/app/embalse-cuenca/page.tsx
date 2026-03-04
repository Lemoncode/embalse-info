import { mapLookupListFromApiToViewModel } from "@/common/mappers";
import { EmbalseCuencaListPod } from "@/pods/embalse-cuenca-list";
import { getRiverBasins } from "@/pods/embalse-cuenca-list/embalse-cuenca-list.repository";
import { Metadata } from "next";

export const revalidate = 300; // ISR: regenerar cada 5 minutos

export const metadata: Metadata = {
  title: "Embalses por cuencas",
};

export const revalidate = 300; // ISR: regenerar cada 5 minutos
export default async function EmbalsesCuencasPage() {
  const cuencasAPI = await getRiverBasins();
  const cuencaList = mapLookupListFromApiToViewModel(cuencasAPI);

  return <EmbalseCuencaListPod cuencaList={cuencaList} />;
}
