import { EmbalseCuencaListPod } from "@/pods/embalse-cuenca-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embalses por cuencas",
};
export default function EmbalsesCuencasPage() {
  return <EmbalseCuencaListPod />;
}
