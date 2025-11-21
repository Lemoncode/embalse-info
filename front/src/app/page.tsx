import Link from "next/link";

const RootPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl">Página de inicio</h2>
      <div className="flex">
        <Link href="/embalse-provincia" className="mr-4 text-blue-500 text-3xl">
          Navegar a Provincias
        </Link>
      </div>
    </div>
  );
};

export default RootPage;
