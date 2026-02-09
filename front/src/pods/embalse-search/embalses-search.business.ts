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
        e.name.toLowerCase().includes(lower) ||
        (e.province ?? "").toLowerCase().includes(lower) ||
        normalizeSearchString(e.name ?? "").includes(normalizedInputValue) ||
        normalizeSearchString(e.province ?? "").includes(normalizedInputValue),
    )
    .map(mapEmbalseToSearch);
};
// si dejo name, province me salen en rojo por q en algun sitio creoq  estan en español,pero si las ponngo en esppañol al escribir en el imput me da error
