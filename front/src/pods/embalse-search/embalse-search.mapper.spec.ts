import { describe, it, expect } from "vitest";
import { mapEmbalseToSearch } from "./embalse-search.mapper";
import type { Embalse } from "db-model";

describe("mapEmbalseToSearch", () => {
  it("should map embalse to search model correctly", () => {
    const mockEmbalse: Embalse = {
      _id: "test-id-123",
      nombre: "Albarracín",
      provincia: "Teruel",
    } as Embalse;

    const result = mapEmbalseToSearch(mockEmbalse);

    expect(result).toEqual({
      slug: "test-id-123",
      name: "Albarracín (Teruel)",
    });
  });

  it("should handle empty province", () => {
    const mockEmbalse: Embalse = {
      _id: "test-id-456",
      nombre: "Embalse Test",
      provincia: "",
    } as Embalse;

    const result = mapEmbalseToSearch(mockEmbalse);

    expect(result).toEqual({
      slug: "test-id-456",
      name: "Embalse Test ()",
    });
  });

  it("should handle null province", () => {
    const mockEmbalse: Embalse = {
      _id: "test-id-789",
      nombre: "Embalse Test",
      provincia: null,
    } as Embalse;

    const result = mapEmbalseToSearch(mockEmbalse);

    expect(result).toEqual({
      slug: "test-id-789",
      name: "Embalse Test (null)",
    });
  });

  it("should handle special characters in name and province", () => {
    const mockEmbalse: Embalse = {
      _id: "test-id-special",
      nombre: "Cueva de la Mora",
      provincia: "Huelva",
    } as Embalse;

    const result = mapEmbalseToSearch(mockEmbalse);

    expect(result).toEqual({
      slug: "test-id-special",
      name: "Cueva de la Mora (Huelva)",
    });
  });

  it("should handle numeric ID", () => {
    const mockEmbalse: Embalse = {
      _id: "12345",
      nombre: "La Viñuela",
      provincia: "Málaga",
    } as Embalse;

    const result = mapEmbalseToSearch(mockEmbalse);

    expect(result).toEqual({
      slug: "12345",
      name: "La Viñuela (Málaga)",
    });
  });
});