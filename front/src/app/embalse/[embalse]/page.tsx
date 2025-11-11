interface Props {
  params: Promise<{ embalse: string }>;
}

export default async function EmbalseDetailPage({ params }: Props) {
  const { embalse } = await params;
  const embalseNombre = embalse
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div>
      <h1>Embalse {embalseNombre}</h1>
    </div>
  );
}
