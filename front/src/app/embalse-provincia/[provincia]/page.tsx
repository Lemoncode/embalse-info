import Link from "next/link";

interface Props {
  params: Promise<{ provincia: string }>;
}

export default async function EmbalseProvinciaListadoPage({ params }: Props) {
  const { provincia } = await params;
  return (
    <div className="flex flex-col gap-8">
      <h2>Embalses de {provincia}</h2>

      <Link href="/embalse/casasola" className="link-accessible">
        Embalse de Casasola
      </Link>
    </div>
  );
}
