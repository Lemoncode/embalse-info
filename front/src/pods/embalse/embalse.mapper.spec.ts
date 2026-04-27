import { describe, it, expect } from "vitest";
import {
  mapEmbalseToReservoirData,
  mapHistoricalReservoirToViewModel,
  mapReservoirLastYearToViewModel,
} from "./embalse.mapper";
import type { Embalse } from "db-model";
import * as historicalApi from "./api/embalse.api-model";
import {
  createEmptyDataLastYearModel,
  createEmptyHistoricalAverageReservoir,
  DataLastYearModel,
  HistoricalAverageReservoir,
} from "./embalse.vm";

describe("mapEmbalseToReservoirData", () => {
  const mockEmbalseBase: Partial<Embalse> = {
    _id: "test-id",
    nombre: "Albarracín",
    capacidad: 1000,
    provincia: "Teruel",
    cuenca: { nombre: "Júcar", _id: "cuenca-id" },
  };

  it("should prioritize SAIH data over AEMET when both are available", () => {
    // Arrange
    const mockEmbalse: Embalse = {
      ...mockEmbalseBase,
      aguaActualSAIH: 800,
      fechaMedidaAguaActualSAIH: new Date("2024-01-15"),
      aguaActualAemet: 600,
      fechaMedidaAguaActualAemet: new Date("2024-01-10"),
    } as Embalse;

    // Act
    const result = mapEmbalseToReservoirData(mockEmbalse, null);

    // Assert
    expect(result.currentVolume).toBe(800);
    expect(result.measurementDate).toBe("15/01/2024");
  });

  it("should use AEMET data when SAIH is null", () => {
    const mockEmbalse: Embalse = {
      ...mockEmbalseBase,
      aguaActualSAIH: null,
      fechaMedidaAguaActualSAIH: null,
      aguaActualAemet: 600,
      fechaMedidaAguaActualAemet: new Date("2024-01-10"),
    } as Embalse;

    const result = mapEmbalseToReservoirData(mockEmbalse, null);

    expect(result.currentVolume).toBe(600);
    expect(result.measurementDate).toBe("10/01/2024");
  });

  it("should set currentVolume to 0 when both water measurements are null", () => {
    const mockEmbalse: Embalse = {
      ...mockEmbalseBase,
      aguaActualSAIH: null,
      fechaMedidaAguaActualSAIH: null,
      aguaActualAemet: null,
      fechaMedidaAguaActualAemet: null,
    } as Embalse;

    const result = mapEmbalseToReservoirData(mockEmbalse, null);

    expect(result.currentVolume).toBe(0);
    expect(result.measurementDate).toBe("");
  });

  it("should format date correctly from Date object", () => {
    const mockEmbalse: Embalse = {
      ...mockEmbalseBase,
      aguaActualSAIH: 500,
      fechaMedidaAguaActualSAIH: new Date("2024-12-25"),
    } as Embalse;

    const result = mapEmbalseToReservoirData(mockEmbalse, null);

    expect(result.measurementDate).toBe("25/12/2024");
  });

  it("should format date correctly from string", () => {
    const mockEmbalse: Embalse = {
      ...mockEmbalseBase,
      aguaActualSAIH: 500,
      fechaMedidaAguaActualSAIH: new Date("2024-12-25T10:30:00Z"),
    } as Embalse;

    const result = mapEmbalseToReservoirData(mockEmbalse, null);

    expect(result.measurementDate).toBe("25/12/2024");
  });

  it("should handle invalid date string", () => {
    const mockEmbalse = {
      ...mockEmbalseBase,
      aguaActualSAIH: 500,
      fechaMedidaAguaActualSAIH: "invalid-date",
    } as unknown as Embalse;

    const result = mapEmbalseToReservoirData(mockEmbalse, null);

    expect(result.measurementDate).toBe("");
  });

  it("should handle null/undefined dates", () => {
    const testCases = [
      { fecha: null, description: "null date" },
      { fecha: undefined, description: "undefined date" },
    ];

    testCases.forEach(({ fecha, description }) => {
      const mockEmbalse: Embalse = {
        ...mockEmbalseBase,
        aguaActualSAIH: 500,
        fechaMedidaAguaActualSAIH: fecha,
      } as Embalse;

      const result = mapEmbalseToReservoirData(mockEmbalse, null);
      expect(result.measurementDate).toBe(``);
    });
  });

  it("should map cuenca correctly when cuenca exists", () => {
    const mockEmbalse: Embalse = {
      ...mockEmbalseBase,
      cuenca: { nombre: "Tajo" },
    } as Embalse;

    const result = mapEmbalseToReservoirData(mockEmbalse, null);

    expect(result.datosEmbalse.cuenca).toBe("Tajo");
  });

  it("should handle null cuenca", () => {
    const mockEmbalse: Embalse = {
      ...mockEmbalseBase,
      cuenca: null,
    } as Embalse;

    const result = mapEmbalseToReservoirData(mockEmbalse, null);

    expect(result.datosEmbalse.cuenca).toBe("");
  });

  it("should handle missing cuenca", () => {
    const mockEmbalse: Embalse = {
      ...mockEmbalseBase,
    } as Embalse;
    delete (mockEmbalse as any).cuenca;

    const result = mapEmbalseToReservoirData(mockEmbalse, null);

    expect(result.datosEmbalse.cuenca).toBe("");
  });

  it("should map all fields correctly", () => {
    const mockEmbalse: Embalse = {
      _id: "test-id",
      nombre: "La Viñuela",
      capacidad: 1500,
      aguaActualSAIH: 750,
      fechaMedidaAguaActualSAIH: new Date("2024-06-15"),
      provincia: "Málaga",
      cuenca: { nombre: "Mediterránea" },
    } as Embalse;

    const result = mapEmbalseToReservoirData(mockEmbalse, null);

    expect(result).toEqual({
      nombre: "La Viñuela",
      currentVolume: 750,
      totalCapacity: 1500,
      measurementDate: "15/06/2024",
      datosEmbalse: {
        cuenca: "Mediterránea",
        mapUrl: "",
        provincia: "Málaga",
        uso: "",
      },
    });
  });

  it("should handle missing provincia", () => {
    const mockEmbalse: Embalse = {
      ...mockEmbalseBase,
      provincia: null,
    } as Embalse;

    const result = mapEmbalseToReservoirData(mockEmbalse, null);

    expect(result.datosEmbalse.provincia).toBe("");
  });
});

describe("mapReservoirLastYearToViewModel", () => {
  it("should correctly map the fields from the last year", () => {
    const mockLastYearData: historicalApi.ReservoirLastYearModel = {
      mes: 3,
      promedio_agua_actual: 54,
    };

    const result: DataLastYearModel =
      mapReservoirLastYearToViewModel(mockLastYearData);
    const expectResult = {
      month: 3,
      average: 54,
      year: new Date().getFullYear() - 1,
    };

    expect(result).toEqual(expectResult);
  });

  it("should return empty data when fill a null value", () => {
    const result: DataLastYearModel = mapReservoirLastYearToViewModel(null);

    expect(result).toEqual(createEmptyDataLastYearModel());
  });

  it("should return empty data when fill a undefined value", () => {
    const result: DataLastYearModel =
      mapReservoirLastYearToViewModel(undefined);

    expect(result).toEqual(createEmptyDataLastYearModel());
  });
});

describe("mapHistoricalReservoirToViewModel", () => {
  it("should accurately map the fields for the last ten years", () => {
    const mockHistoricalData: historicalApi.HistoricalAverageReservoir = {
      embalse: "Viñuela, La",
      mes: 3,
      promedio_agua_actual: 149.21,
    };

    const result: HistoricalAverageReservoir =
      mapHistoricalReservoirToViewModel(mockHistoricalData);

    const expectResult = {
      nameReservoir: "Viñuela, La",
      month: 3,
      average: 149.21,
    };

    expect(result).toEqual(expectResult);
  });
  it("should return empty data when fill a null value", () => {
    const result: HistoricalAverageReservoir =
      mapHistoricalReservoirToViewModel(null);

    expect(result).toEqual(createEmptyHistoricalAverageReservoir());
  });

  it("should return empty data when fill a undefined value", () => {
    const result: HistoricalAverageReservoir =
      mapHistoricalReservoirToViewModel(undefined);

    expect(result).toEqual(createEmptyHistoricalAverageReservoir());
  });
});
