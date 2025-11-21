import Link from "next/link";

interface Props {
  params: { embalse: string };
}

export default function EmbalseDetallePage({ params }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Link href="/embalse-provincia" className="mr-4 text-blue-500 text-xl">
        ← Volver a listado de provincias
      </Link>
      <h2 className="text-4xl">Detalle del embalse: {params.embalse}</h2>
    </div>
  );
}
