"use client";
import React from "react";
import { ReservoirData } from "../embalse.vm";
import { GaugeChart } from "./reservoir-gauge";
import { GaugeLegend } from "./reservoir-gauge/gauge-chart/components/gauge-legend.component";
import { HistoryChart } from "./chart";
interface Props {
  name: string;
  reservoirData: ReservoirData;
}
export const ReservoirCardGauge: React.FC<Props> = (props) => {
  const { name, reservoirData } = props;
  const { currentVolume, totalCapacity, measurementDate } = reservoirData;
  const percentage = totalCapacity > 0 ? currentVolume / totalCapacity : 0;
  const [cardGaugeSelected, setCardGaugeSelected] =
    React.useState<boolean>(true);

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = React.useState<boolean>(false);
    React.useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      setIsMobile(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
      mediaQuery.addEventListener("change", handler);

      return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return isMobile;
  };
  const isMobile = useIsMobile();

  const handleGraphicDisplay = (e: React.MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.name;
    if (action === "currentStatus") {
      setCardGaugeSelected(true);
    } else if (action === "historicalStatus") {
      setCardGaugeSelected(false);
    }
  };
  return (
    <section
      className="card bg-base-100 mx-auto h-full w-full items-center gap-6 rounded-2xl p-4 shadow-lg"
      aria-labelledby="gauge-title"
    >
      <h2 id="gauge-title" className="text-center">
        {name}
      </h2>
      {isMobile && (
        <div className="join">
          <button
            name="currentStatus"
            onClick={handleGraphicDisplay}
            className={`btn join-item h-8 rounded-l-lg ${cardGaugeSelected ? "bg-yellow-50" : "bg-transparent"}`}
          >
            Capacidad
          </button>
          <button
            name="historicalStatus"
            onClick={handleGraphicDisplay}
            className={`btn join-item h-8 rounded-r-lg ${!cardGaugeSelected ? "bg-yellow-50" : "bg-transparent"}`}
          >
            Histórico
          </button>
        </div>
      )}
      {cardGaugeSelected || !isMobile ? (
        <>
          <GaugeChart
            percentage={percentage > 100 ? 100 : percentage}
            measurementDate={measurementDate}
          />
          <GaugeLegend
            currentVolume={currentVolume}
            totalCapacity={totalCapacity}
          />
        </>
      ) : (
        <HistoryChart
          titleChart=""
          currentLevel={currentVolume}
          maxCapacity={totalCapacity}
          reservoirName={name}
          dataOneYearAgo={{ average: 20, month: 3, year: 2025 }}
          dataTenYearsAgo={{
            average: 30,
            month: 3,
            nameReservoir: name,
            year: 2016,
          }}
        />
      )}
    </section>
  );
};
