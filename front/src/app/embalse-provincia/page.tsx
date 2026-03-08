import { EmbalseProvinciaListPod } from "@/pods/embalse-provincia-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embalses por provincias",
};

export default function EmbalsesProvinciaPage() {
  return <EmbalseProvinciaListPod />;
}
