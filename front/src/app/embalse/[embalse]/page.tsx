import { ReservoirCardGauge } from "@/pods/embalse/components/reservoir-card-gauge";
import { mockData } from "../../../model/reservoir-data";
import { ReservoirCardInfo } from "@/pods/embalse/components/reservoir-card-info.component";
import { ReservoirCardDetail } from "@/pods/embalse/components/reservoir-card-detail";

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
      <div className="space-y-6">
        <ReservoirCardGauge
          name={embalse}
          currentVolume={reservoirData.currentVolume}
          totalCapacity={reservoirData.totalCapacity}
          measurementDate={reservoirData.measurementDate}
          datosEmbalse={datosEmbv}
          reservoirInfo={reservoirInfo}
        />
        <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg">
          <ReservoirCardInfo reservoirInfo={reservoirInfo} />
        </div>
        <div className="card bg-base-100 mx-auto w-full max-w-[400px] items-center gap-6 rounded-2xl p-4 shadow-lg">
          <ReservoirCardDetail datosEmbalse={datosEmbv} />
        </div>
      </div>
    </div>
  );
}
