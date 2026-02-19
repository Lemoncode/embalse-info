import { EmbalseProvinciaPod } from "@/pods/embalse-provincia";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embalses por provincias",
};

export default function EmbalsesProvinciaPage() {
  return <EmbalseProvinciaPod />;
}
