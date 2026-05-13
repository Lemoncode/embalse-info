import { EmbalseProvinciaListPod } from "@/pods/embalse-provincia-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embalses por provincias",
  description:
    "Listado completo de embalses de España agrupados por provincia. Consulta los embalses de tu provincia y su nivel actual.",
  alternates: { canonical: "/embalse-provincia" },
};

export default function EmbalsesProvinciaPage() {
  return <EmbalseProvinciaListPod />;
}
