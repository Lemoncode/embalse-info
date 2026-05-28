import { mapEmbalseToSearch } from "./embalse-search.mapper";
import { Embalse } from "./api";
import { formatEmbalseDisplayName } from "@/common/helpers/embalse-name.helper";

export const normalizeSearchString = (input: string): string => {
  return input
    ? input
        .toString()
        .normalize("NFD") // Separa los acentos de las letras
        .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Elimina signos de puntuación
        .replace(/\s+/g, " ")
        .trim()
    : ""; // Reemplaza múltiples espacios por uno
};

export const getFilteredEmbalses = (
  inputValue: string,
  embalses: Embalse[],
) => {
  if (!embalses || embalses.length === 0) {
    return [];
  }
  // Separa campo de búsqueda en diferentes palabras y busca que contenta las palabras juntas en base de datos, independiente del orden
  const words = normalizeSearchString(inputValue).split(" ");

  return embalses
    .filter((e) => {
      const nombre = normalizeSearchString(e.nombre ?? "");
      const provincia = normalizeSearchString(e.provincia ?? "");
      return words.every(
        (word) => nombre.includes(word) || provincia.includes(word),
      );
    })
    .map(mapEmbalseToSearch);
};
