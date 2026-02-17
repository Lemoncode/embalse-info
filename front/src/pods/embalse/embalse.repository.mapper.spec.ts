import { describe, it, expect } from "vitest";
import { mapEmbalse } from "./embalse.repository.mapper";
import { createEmptyEmbalse } from "./embalse.vm";
import type { Embalse } from "db-model";

describe("embalse repository mapper specs", () => {
  it.each<{ embalse: Embalse | null | undefined }>([
    { embalse: undefined },
    { embalse: null },
  ])(
    "should return empty embalse when it feeds embalse equals $embalse",
    ({ embalse }) => {
      // Act
      const result = mapEmbalse(embalse);

      // Assert
      expect(result).toEqual(createEmptyEmbalse());
    }
  );

  it("should throw error when _id is undefined", () => {
    // Arrange
    const embalse = {
      embalse_id: 123,
      nombre: "Test Embalse",
      slug: "test-embalse",
      cuenca: { _id: "test-id", nombre: "Test Cuenca" },
      capacidad: 1000,
    } as Embalse;

    // Act & Assert
    expect(() => mapEmbalse(embalse)).toThrow("Cannot read properties of undefined");
  });

  it("should return mapped embalse when it feeds valid embalse with all fields", () => {
    // Arrange
    const embalse: Embalse = {
      _id: "507f1f77bcf86cd799439011",
      embalse_id: 123,
      nombre: "La Viñuela",
      slug: "la-vinuela",
      cuenca: { _id: "507f1f77bcf86cd799439012", nombre: "Mediterránea" },
      provincia: "Málaga",
      capacidad: 1500,
      aguaActualAemet: 750,
      fechaMedidaAguaActualAemet: new Date("2024-01-15"),
      aguaActualSAIH: 800,
      fechaMedidaAguaActualSAIH: new Date("2024-01-16"),
      descripcion_id: "456",
      uso: "Riego",
    } as Embalse;

    // Act
    const result = mapEmbalse(embalse);

    // Assert
    expect(result).toEqual({
      _id: "507f1f77bcf86cd799439011",
      embalse_id: 123,
      nombre: "La Viñuela",
      slug: "la-vinuela",
      cuenca: {
        _id: "507f1f77bcf86cd799439012",
        nombre: "Mediterránea",
      },
      provincia: "Málaga",
      capacidad: 1500,
      aguaActualAemet: 750,
      fechaMedidaAguaActualAemet: new Date("2024-01-15"),
      aguaActualSAIH: 800,
      fechaMedidaAguaActualSAIH: new Date("2024-01-16"),
      descripcion_id: "456",
      uso: "Riego",
    });
  });

  it("should map embalse with null cuenca correctly", () => {
    // Arrange
    const embalse: Embalse = {
      _id: "507f1f77bcf86cd799439011",
      embalse_id: 123,
      nombre: "Test Embalse",
      slug: "test-embalse",
      cuenca: null,
      provincia: "Test Province",
      capacidad: 1000,
    } as Embalse;

    // Act
    const result = mapEmbalse(embalse);

    // Assert
    expect(result.cuenca).toEqual({
      _id: "",
      nombre: "",
    });
  });

  it("should map embalse with undefined cuenca _id correctly", () => {
    // Arrange
    const embalse: Embalse = {
      _id: "507f1f77bcf86cd799439011",
      embalse_id: 123,
      nombre: "Test Embalse",
      slug: "test-embalse",
      cuenca: { nombre: "Test Cuenca" },
      provincia: "Test Province",
      capacidad: 1000,
    } as Embalse;

    // Act
    const result = mapEmbalse(embalse);

    // Assert
    expect(result.cuenca).toEqual({
      _id: "",
      nombre: "Test Cuenca",
    });
  });

  it("should map embalse with undefined cuenca nombre correctly", () => {
    // Arrange
    const embalse: Embalse = {
      _id: "507f1f77bcf86cd799439011",
      embalse_id: 123,
      nombre: "Test Embalse",
      slug: "test-embalse",
      cuenca: { _id: "507f1f77bcf86cd799439012" },
      provincia: "Test Province",
      capacidad: 1000,
    } as Embalse;

    // Act
    const result = mapEmbalse(embalse);

    // Assert
    expect(result.cuenca).toEqual({
      _id: "507f1f77bcf86cd799439012",
      nombre: "",
    });
  });

  it("should convert _id to string", () => {
    // Arrange
    const embalse: Embalse = {
      _id: { toString: () => "507f1f77bcf86cd799439011" } as any,
      embalse_id: 123,
      nombre: "Test Embalse",
      slug: "test-embalse",
      cuenca: { _id: "507f1f77bcf86cd799439012", nombre: "Test Cuenca" },
      capacidad: 1000,
    } as Embalse;

    // Act
    const result = mapEmbalse(embalse);

    // Assert
    expect(result._id).toBe("507f1f77bcf86cd799439011");
  });

  it("should handle null optional fields correctly", () => {
    // Arrange
    const embalse: Embalse = {
      _id: "507f1f77bcf86cd799439011",
      embalse_id: 123,
      nombre: "Test Embalse",
      slug: "test-embalse",
      cuenca: { _id: "507f1f77bcf86cd799439012", nombre: "Test Cuenca" },
      provincia: null,
      capacidad: 1000,
      aguaActualAemet: null,
      fechaMedidaAguaActualAemet: null,
      aguaActualSAIH: null,
      fechaMedidaAguaActualSAIH: null,
      descripcion_id: null,
      uso: null,
    } as Embalse;

    // Act
    const result = mapEmbalse(embalse);

    // Assert
    expect(result.provincia).toBeNull();
    expect(result.aguaActualAemet).toBeNull();
    expect(result.fechaMedidaAguaActualAemet).toBeNull();
    expect(result.aguaActualSAIH).toBeNull();
    expect(result.fechaMedidaAguaActualSAIH).toBeNull();
    expect(result.descripcion_id).toBeNull();
    expect(result.uso).toBe("");
  });

  it("should convert undefined optional fields to defaults", () => {
    // Arrange
    const embalse: Embalse = {
      _id: "507f1f77bcf86cd799439011",
      embalse_id: 123,
      nombre: "Test Embalse",
      slug: "test-embalse",
      cuenca: { _id: "507f1f77bcf86cd799439012", nombre: "Test Cuenca" },
      capacidad: 1000,
    } as Embalse;

    // Act
    const result = mapEmbalse(embalse);

    // Assert
    expect(result.provincia).toBeNull();
    expect(result.aguaActualAemet).toBeNull();
    expect(result.fechaMedidaAguaActualAemet).toBeNull();
    expect(result.aguaActualSAIH).toBeNull();
    expect(result.fechaMedidaAguaActualSAIH).toBeNull();
    expect(result.descripcion_id).toBeNull();
    expect(result.uso).toBe("");
  });
});