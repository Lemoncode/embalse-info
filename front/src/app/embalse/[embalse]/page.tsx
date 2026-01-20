import { mockData } from "../../model/reservoir-data";
import { ReservoirGauge } from "./reservoir-gauge";

interface Props {
  params: Promise<{ embalse: string }>;
}

export default async function EmbalseDetallePage({ params }: Props) {
  const { embalse } = await params;

  const reservoirData = mockData;
  const datosEmbv = mockData.datosEmbalse;
  const reservoirInfo = mockData.reservoirInfo;

  return (
    <div className="flex flex-col gap-8">
      <ReservoirGauge
        name={embalse}
        currentVolume={reservoirData.currentVolume}
        totalCapacity={reservoirData.totalCapacity}
        measurementDate={reservoirData.measurementDate}
        datosEmbalse={datosEmbv}
        reservoirInfo={reservoirInfo}
      />
    </div>
  );
}
