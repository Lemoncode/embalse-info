import { describe, it, expect } from "vitest";
import { normalizeSearchString, getFilteredEmbalses } from './embalse-search.business';

describe('normalizeSearchString', () => {
  it('should return a empty string when input is empty', () => {
    // Arrange
    const input = '';

    // Act
    const result = normalizeSearchString(input);

    // Assert
    expect(result).toBe('');
  });

  it('should return a empty string when input is null', () => {
    // Arrange
    const input: any = null;

    // Act
    const result = normalizeSearchString(input);

    // Assert
    expect(result).toBe('');
  });

  it('should return a empty string when input is undefined', () => {
    // Arrange
    const input: any = undefined;

    // Act
    const result = normalizeSearchString(input);

    // Assert
    expect(result).toBe('');
  });

  it('should normalize a string by removing accents, punctuation and extra spaces', () => {
    // Arrange
    const input = '   Guadalquivir  ';
    const expectedResult = 'guadalquivir';

    // Act
    const result = normalizeSearchString(input);

    // Assert
    expect(result).toBe(expectedResult);
  });

  it('should normalize a string with accents', () => {
    // Arrange
    const input = 'Sistema Valle de Arán';
    const expectedResult = 'sistema valle de aran';

    // Act
    const result = normalizeSearchString(input);

    // Assert
    expect(result).toBe(expectedResult);
  });

  it('should normalize a string with punctuation', () => {
    // Arrange
    const input = 'Embalse de la Mora, Huelva.';
    const expectedResult = 'embalse de la mora huelva';

    // Act
    const result = normalizeSearchString(input);

    // Assert
    expect(result).toBe(expectedResult);
  });

  it('should return Avinuela, when feed Aviñuela', () => {
    // Arrange
    const input = 'Aviñuela';
    const expectedResult = 'avinuela';

    // Act
    const result = normalizeSearchString(input);

    // Assert
    expect(result).toBe(expectedResult);
  });

});

describe('getFilteredEmbalses', () => {
  it('should return an empty array when embalses and inputValue is empty', () => {
    // Arrange
    const inputValue = '';
    const embalses = [];

    // Act
    const result = getFilteredEmbalses(inputValue, embalses);

    // Assert
    expect(result).toEqual([]);
  });

  it('should return an empty array when embalses is empty and inputValue is null', () => {
    // Arrange
    const inputValue = null as any;
    const embalses = [];

    // Act
    const result = getFilteredEmbalses(inputValue, embalses);

    // Assert
    expect(result).toEqual([]);
  });

  it('should return an empty array when embalses is empty and inputValue is undefined', () => {
    // Arrange
    const inputValue = undefined as any;
    const embalses = [];

    // Act
    const result = getFilteredEmbalses(inputValue, embalses);

    // Assert
    expect(result).toEqual([]);
  });

  it('should return an empty array when embalses is empty', () => {
    // Arrange
    const inputValue = 'Viñuela';
    const embalses = [];

    // Act
    const result = getFilteredEmbalses(inputValue, embalses);

    // Assert
    expect(result).toEqual([]);
  });

  it('should return filtered embalses based on inputValue', () => {
    // Arrange
    const inputValue = 'Viñuela';
    const embalses = [
      { _id: '1', nombre: 'Embalse de la Mora', provincia: 'Huelva' },
      { _id: '2', nombre: 'Embalse de la Viñuela', provincia: 'Málaga' },
    ];
    const expectedResult = [
      { slug: '2', name: 'Embalse de la Viñuela (Málaga)' },
    ];

    // Act
    const result = getFilteredEmbalses(inputValue, embalses);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});

