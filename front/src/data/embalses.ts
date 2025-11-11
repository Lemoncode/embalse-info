export interface Embalse {
  id: number;
  nombre: string;
  capacidad: number;
  provincia: string;
}

export const embalsesData: Embalse[] = [
  // Madrid
  {
    id: 1,
    nombre: "Embalse de Santillana",
    capacidad: 91.2,
    provincia: "Madrid",
  },
  {
    id: 2,
    nombre: "Embalse del Atazar",
    capacidad: 425.9,
    provincia: "Madrid",
  },

  // Barcelona
  { id: 3, nombre: "Embalse de Sau", capacidad: 177.0, provincia: "Barcelona" },
  {
    id: 4,
    nombre: "Embalse de La Baells",
    capacidad: 115.0,
    provincia: "Barcelona",
  },

  // Valencia
  { id: 5, nombre: "Embalse de Tous", capacidad: 378.9, provincia: "Valencia" },
  {
    id: 6,
    nombre: "Embalse de Alarcón",
    capacidad: 1112.0,
    provincia: "Valencia",
  },

  // Sevilla
  {
    id: 7,
    nombre: "Embalse de La Minilla",
    capacidad: 274.0,
    provincia: "Sevilla",
  },
  {
    id: 8,
    nombre: "Embalse del Pintado",
    capacidad: 210.0,
    provincia: "Sevilla",
  },

  // Toledo
  {
    id: 9,
    nombre: "Embalse de Castrejón",
    capacidad: 516.0,
    provincia: "Toledo",
  },
  {
    id: 10,
    nombre: "Embalse de Azután",
    capacidad: 654.0,
    provincia: "Toledo",
  },

  // Cáceres
  {
    id: 11,
    nombre: "Embalse de Alcántara",
    capacidad: 3162.0,
    provincia: "Cáceres",
  },
  {
    id: 12,
    nombre: "Embalse de Valdecañas",
    capacidad: 1446.0,
    provincia: "Cáceres",
  },
];

export const getEmbalsesPorProvincia = (provincia: string): Embalse[] =>
  embalsesData.filter(
    (embalse) => embalse.provincia.toLowerCase() === provincia.toLowerCase()
  );

export const getAllEmbalses = (): Embalse[] => embalsesData;

export const formatEmbalseForUrl = (nombre: string): string =>
  nombre.toLowerCase().replace(/ /g, "-");

export function formatUrlForEmbalse(urlName: string): string {
  return decodeURIComponent(urlName)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}
