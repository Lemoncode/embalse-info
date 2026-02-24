import { Metadata } from "next";
import { EquipoPod } from "@/pods/equipo";

export const metadata: Metadata = {
  title: "Equipo - InfoEmbalses",
};

const EquipoPage = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-col items-center gap-6">
        <img src="/images/logo.svg" alt="InfoEmbalses logo" className="w-64" />
        <p className="text-xl font-semibold">InfoEmbalses Versión Beta</p>
        <h1 className="text-3xl font-bold">Equipo de desarrollo</h1>
        <EquipoPod />
      </div>
    </div>
  );
};

export default EquipoPage;
