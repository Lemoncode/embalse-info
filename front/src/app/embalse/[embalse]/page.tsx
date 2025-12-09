import Link from "next/link";
import { mockData } from "../../model/reservoir-data";
import { ReservoirGauge } from "./reservoir-gauge";

interface Props {
  params: Promise<{ embalse: string }>;
}

export default async function EmbalseDetallePage({ params }: Props) {
  const { embalse } = await params;

  const reservoirData = mockData;

  return (
    <div className="flex flex-col gap-8">
      <ReservoirGauge name={embalse} {...reservoirData} />
    </div>
  );
}
