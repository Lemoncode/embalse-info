import { EmbalsePod } from "@/pods/embalse";

interface Props {
  params: Promise<{ embalse: string }>;
}

export default async function EmbalseDetallePage({ params }: Props) {
  const { embalse } = await params;

  return <EmbalsePod embalse={embalse} />;
}
