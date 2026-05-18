import { describe, it, expect } from "vitest";
import { formatEmbalseDisplayName } from "./embalse-name.helper";

describe("formatEmbalseDisplayName", () => {
  it("flips comma-inverted El", () => {
    expect(formatEmbalseDisplayName("Atazar, El")).toBe("El Atazar");
    expect(formatEmbalseDisplayName("Pardo, El")).toBe("El Pardo");
    expect(formatEmbalseDisplayName("Villar, El")).toBe("El Villar");
    expect(formatEmbalseDisplayName("Forcadas, As")).toBe("As Forcadas");
    expect(formatEmbalseDisplayName("Peares, Os")).toBe("Os Peares");
    expect(formatEmbalseDisplayName("Ribeira, A")).toBe("A Ribeira");
  });

  it("flips comma-inverted La", () => {
    expect(formatEmbalseDisplayName("Jarosa, La")).toBe("La Jarosa");
  });

  it("handles compound suffix with hyphen and parens", () => {
    expect(formatEmbalseDisplayName("Vellón,El-(Pedrezuela)")).toBe(
      "El Vellón (Pedrezuela)",
    );
  });

  it("leaves untouched names without inverted article", () => {
    expect(formatEmbalseDisplayName("Navacerrada")).toBe("Navacerrada");
    expect(formatEmbalseDisplayName("Entrepeñas")).toBe("Entrepeñas");
    expect(formatEmbalseDisplayName("Cáceres - Guadiloba")).toBe(
      "Cáceres - Guadiloba",
    );
    expect(formatEmbalseDisplayName("Gabriel y Galán")).toBe("Gabriel y Galán");
  });

  it("returns empty string for empty input", () => {
    expect(formatEmbalseDisplayName("")).toBe("");
  });
  it("inverts article in parenthesized format", () => {
    expect(formatEmbalseDisplayName("Loteta (La)")).toBe("La Loteta");
  });
});
