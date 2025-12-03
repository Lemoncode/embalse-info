import Link from "next/link";

const RootPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <h2>Página de inicio</h2>
      <div className="flex flex-col gap-4">
        <Link href="/embalse-provincia" className="mr-4 text-3xl text-blue-500">
          Embalses por provincias
        </Link>
        <Link href="/embalse/casasola" className="mr-4 text-3xl text-blue-500">
          Detalle del embalse
        </Link>
      </div>
    </div>
  );
};

export default RootPage;
