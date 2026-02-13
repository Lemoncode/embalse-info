import { InfoDestinoArcgis } from "db-model";

// Arcgis falta guadalhorce, o está agrupado guadalhorce con guadalteba?
// Arcgis falta Cueva de la Mora, Huelva
export const mapperFromCuencasMediterraneaToArcgis = new Map<
  number,
  InfoDestinoArcgis
>([
  [3, { nombre: "Charco Redondo", idArcgis: 101 }],
  [8, { nombre: "Guadarranque", idArcgis: 158 }],
  [269, { nombre: "Zahara-El Gastor", idArcgis: 350 }],
  [270, { nombre: "Bornos", idArcgis: 58 }],
  [271, { nombre: "Arcos de la Frontera", idArcgis: 27 }],
  [272, { nombre: "Los Hurones", idArcgis: 167 }],
  [273, { nombre: "Guadalcacín", idArcgis: 152 }],
  [275, { nombre: "Barbate", idArcgis: 39 }],
  [276, { nombre: "Celemín", idArcgis: 93 }],
  [277, { nombre: "Almodóvar", idArcgis: 21 }],
  [16, { nombre: "Concepción", idArcgis: 106 }],
  [19, { nombre: "Casasola", idArcgis: 380 }],
  [20, { nombre: "Limonero", idArcgis: 184 }],
  [29, { nombre: "Guadalteba", idArcgis: 154 }],
  [31, { nombre: "Conde del guadalhorce", idArcgis: 108 }],
  [37, { nombre: "La Viñuela", idArcgis: 347 }],
  [51, { nombre: "Rules", idArcgis: 379 }],
  [64, { nombre: "Béznar", idArcgis: 68 }],
  [58, { nombre: "Benínar", idArcgis: 51 }],
  [84, { nombre: "Cuevas de Almanzora", idArcgis: 118 }],
  [371, { nombre: "Chanza", idArcgis: 100 }],
  [373, { nombre: "Piedras", idArcgis: 229 }],
  [374, { nombre: "Machos", idArcgis: 189 }],
  [376, { nombre: "Olivargas", idArcgis: 216 }],
  [377, { nombre: "Corumbel Bajo", idArcgis: 113 }],
  [379, { nombre: "Jarrama", idArcgis: 358 }],
  [380, { nombre: "Andévalo", idArcgis: 355 }],
]);

// Ojo VALBONA, TORANES, MORA, BALAGUERAS, L'ALCORA, ONDA, Cortes II, El Naranjero,

export const mapperFromCuencasJucarToArcgis = new Map<
  number,
  InfoDestinoArcgis
>([
  [243, { nombre: "Ulldecona", idArcgis: 320 }],
  [266, { nombre: "Arenós", idArcgis: 28 }],
  [247, { nombre: "Sichar", idArcgis: 294 }],
  [248, { nombre: "María Cristina", idArcgis: 197 }],
  [221, { nombre: "Regajo", idArcgis: 249 }],
  [381, { nombre: "Algar", idArcgis: 374 }],
  [270, { nombre: "Arquillo de San Blas", idArcgis: 31 }],
  [293, { nombre: "Benagéber", idArcgis: 49 }],
  [294, { nombre: "Loriguilla", idArcgis: 188 }],
  [295, { nombre: "Buseo", idArcgis: 66 }],
  [280, { nombre: "La Toba", idArcgis: 182 }],
  [541, { nombre: "Alarcón", idArcgis: 9 }],
  [287, { nombre: "Contreras", idArcgis: 109 }],
  [359, { nombre: "Escalona", idArcgis: 130 }],
  [300, { nombre: "Tous - La Ribera", idArcgis: 315 }],
  [328, { nombre: "Bellús", idArcgis: 47 }],
  [303, { nombre: "Forata", idArcgis: 139 }],
  [346, { nombre: "Beniarrés", idArcgis: 50 }],
  [332, { nombre: "Guadalest", idArcgis: 153 }],
  [331, { nombre: "Amadorio", idArcgis: 23 }],
]);
