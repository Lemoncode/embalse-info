import { mapEmbalseToSearch } from "./embalse-search.mapper";
import { Embalse } from "./api";

export const normalizeSearchString = (input: string): string => {
  return input
    .toString()
    .normalize("NFD") // Separa los acentos de las letras
    .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Elimina signos de puntuación
    .replace(/\s+/g, " "); // Reemplaza múltiples espacios por uno
};
// encontre todos esos filtros por internet y los aplico si sobra alguno lo quitamos, tmabiend eje las dewescripciones

export const getFilteredEmbalses = (
  inputValue: string,
  embalses: Embalse[],
) => {
  if (!embalses || embalses.length === 0) {
    return [];
  }

  const lower = inputValue.toLowerCase();
  const normalizedInputValue = normalizeSearchString(inputValue);

  return embalses
    .filter(
      (e) =>
        e.nombre.toLowerCase().includes(lower) ||
        (e.provincia ?? "").toLowerCase().includes(lower) ||
        normalizeSearchString(e.nombre ?? "").includes(normalizedInputValue) ||
        normalizeSearchString(e.provincia ?? "").includes(normalizedInputValue),
    )
    .map(mapEmbalseToSearch);
};
