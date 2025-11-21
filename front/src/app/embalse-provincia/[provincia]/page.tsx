import Link from "next/link";

interface Props {
  params: { provincia: string };
}

export default function EmbalseProvinciaListadoPage({ params }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Link href="/" className="mr-4 text-blue-500 text-xl">
        ← Volver a provincias
      </Link>

      <h2 className="text-4xl">Embalses de {params.provincia}</h2>

      <Link href="/embalse/casasola" className="text-blue-500 text-xl">
        Embalse de Casasola
      </Link>
    </div>
  );
}
