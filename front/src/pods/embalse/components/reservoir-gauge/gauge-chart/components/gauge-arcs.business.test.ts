import { describe, it, expect } from "vitest";
import { calculateFilledAngle } from "./gauge-arcs.business";
import { arcConfig } from "./model";

describe("calculateFilledAngle", () => {
  it("should return start angle when percentage is 0", () => {
    const result = calculateFilledAngle(0);
    expect(result).toBe(arcConfig.startAngle);
  });

  it("should return end angle when percentage is 1", () => {
    const result = calculateFilledAngle(1);
    expect(result).toBe(arcConfig.endAngle);
  });

  it("should return middle angle when percentage is 0.5", () => {
    const result = calculateFilledAngle(0.5);
    const expectedMiddle = arcConfig.startAngle + (arcConfig.endAngle - arcConfig.startAngle) * 0.5;
    expect(result).toBe(expectedMiddle);
  });

  it("should handle percentages between 0 and 1 correctly", () => {
    const testCases = [
      { percentage: 0.25, expected: arcConfig.startAngle + (arcConfig.endAngle - arcConfig.startAngle) * 0.25 },
      { percentage: 0.75, expected: arcConfig.startAngle + (arcConfig.endAngle - arcConfig.startAngle) * 0.75 },
      { percentage: 0.1, expected: arcConfig.startAngle + (arcConfig.endAngle - arcConfig.startAngle) * 0.1 },
    ];

    testCases.forEach(({ percentage, expected }) => {
      const result = calculateFilledAngle(percentage);
      expect(result).toBeCloseTo(expected, 10);
    });
  });

  it("should clamp negative percentages to 0", () => {
    const result = calculateFilledAngle(-0.5);
    expect(result).toBe(arcConfig.startAngle);
  });

  it("should clamp percentages greater than 1 to 1", () => {
    const result = calculateFilledAngle(1.5);
    expect(result).toBe(arcConfig.endAngle);
  });

  it("should handle edge case percentages", () => {
    expect(calculateFilledAngle(-Infinity)).toBe(arcConfig.startAngle);
    expect(calculateFilledAngle(Infinity)).toBe(arcConfig.endAngle);
    expect(isNaN(calculateFilledAngle(NaN))).toBe(true);
  });

  it("should handle very small positive percentages", () => {
    const result = calculateFilledAngle(0.001);
    const expected = arcConfig.startAngle + (arcConfig.endAngle - arcConfig.startAngle) * 0.001;
    expect(result).toBeCloseTo(expected, 10);
  });

  it("should handle very large negative percentages", () => {
    const result = calculateFilledAngle(-1000);
    expect(result).toBe(arcConfig.startAngle);
  });
});