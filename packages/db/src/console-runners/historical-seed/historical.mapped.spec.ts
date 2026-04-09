import {
  mapHistoricalAverageToDB,
  mapLastYearAverageToDB,
} from "./historical.mapped.js";
import {
  createEmptyHistoricalLastYear,
  createEmptyHistoricalTenYearsAgo,
  HistoricalLastYear,
  HistoricalTenYearsAgo,
  PromedioAnualPorMesOutput,
  PromedioMensualOutput,
} from "./types.js";
import { describe, it, expect } from "vitest";

describe("mapHistoricalAverageToDB", () => {
  it("should accurately map the fields for the last ten years", () => {
    const mockHistoricalData: PromedioMensualOutput = {
      metadata: {
        generatedAt: "2026-03-05T10:45:15.199Z",
        periodoInicio: "2016-03",
        periodoFin: "2026-03",
      },
      data: {
        Aceña: [
          {
            año: 2016,
            mes: 3,
            promedio_agua_actual: 15.2,
          },
          {
            año: 2016,
            mes: 4,
            promedio_agua_actual: 18.75,
          },
        ],
      },
    };
    const result: HistoricalTenYearsAgo[] =
      mapHistoricalAverageToDB(mockHistoricalData);

    const expectResult = [
      {
        embalse: "Aceña",
        meses: [
          {
            mes: 3,
            año: 2016,
            promedio_agua_actual: 15.2,
          },
          {
            mes: 4,
            año: 2016,
            promedio_agua_actual: 18.75,
          },
        ],
        metadata: {
          generatedAt: "2026-03-05T10:45:15.199Z",
          periodoInicio: "2016-03",
          periodoFin: "2026-03",
        },
      },
    ];
    expect(result).toEqual(expectResult);
  });

  it("should return empty data when fill a null value", () => {
    const result: HistoricalTenYearsAgo[] = mapHistoricalAverageToDB(null);
    expect(result).toEqual(createEmptyHistoricalTenYearsAgo());
  });
  it("should return empty data when fill a undefined value", () => {
    const result: HistoricalTenYearsAgo[] = mapHistoricalAverageToDB(undefined);
    expect(result).toEqual(createEmptyHistoricalTenYearsAgo());
  });
});

describe("mapHistoricalAverageToDB", () => {
  it("should accurately map the fields for last years", () => {
    const mockHistoricalData: PromedioAnualPorMesOutput = {
      metadata: {
        generatedAt: "2026-03-05T10:45:15.199Z",
        periodoInicio: "2016-03",
        periodoFin: "2026-03",
      },
      data: {
        Aceña: [
          {
            mes: 3,
            promedio_agua_actual: 15.2,
          },
          {
            mes: 4,
            promedio_agua_actual: 18.75,
          },
        ],
      },
    };
    const result: HistoricalLastYear[] =
      mapLastYearAverageToDB(mockHistoricalData);

    const expectResult = [
      {
        embalse: "Aceña",
        meses: [
          {
            mes: 3,
            promedio_agua_actual: 15.2,
          },
          {
            mes: 4,
            promedio_agua_actual: 18.75,
          },
        ],
        metadata: {
          generatedAt: "2026-03-05T10:45:15.199Z",
          periodoInicio: "2016-03",
          periodoFin: "2026-03",
        },
      },
    ];
    expect(result).toEqual(expectResult);
  });

  it("should return empty data when fill a null value", () => {
    const result: HistoricalLastYear[] = mapLastYearAverageToDB(null);
    expect(result).toEqual(createEmptyHistoricalLastYear());
  });
  it("should return empty data when fill a undefined value", () => {
    const result: HistoricalLastYear[] = mapLastYearAverageToDB(undefined);
    expect(result).toEqual(createEmptyHistoricalLastYear());
  });
});
