import Link from "next/link";

interface Props {
  params: Promise<{ embalse: string }>;
}

export default async function EmbalseDetallePage({ params }: Props) {
  const { embalse } = await params;
  return (
    <div className="flex flex-col gap-8">
      <h2>Detalle del embalse: {embalse}</h2>
      <p>Hola hgola h uhfrf hfueh</p>
    </div>
  );
}
