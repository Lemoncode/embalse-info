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

// OJO Aguilar de Campoo

export const mapperFromCuencasDueroToArcgis = new Map<
  number,
  InfoDestinoArcgis
>([
  [1, { nombre: "Villameca", idArcgis: 344 }],
  [2, { nombre: "Barrios de Luna", idArcgis: 42 }],
  [3, { nombre: "Porma", idArcgis: 232 }],
  [4, { nombre: "Riaño", idArcgis: 254 }],
  [7, { nombre: "Camporredondo", idArcgis: 74 }],
  [8, { nombre: "Compuerto", idArcgis: 105 }],
  [11, { nombre: "Cervera-Ruesga", idArcgis: 98 }], // OJO puede ser Cervera
  [12, { nombre: "La Requejada", idArcgis: 250 }],
  [16, { nombre: "Arlanzón", idArcgis: 30 }],
  [17, { nombre: "Úzquiza", idArcgis: 324 }],
  [20, { nombre: "Cuerda del Pozo", idArcgis: 116 }],
  [22, { nombre: "Linares del Arroyo", idArcgis: 185 }],
  [23, { nombre: "El Pontón Alto", idArcgis: 375 }],
  [26, { nombre: "Castro de las Cogotas", idArcgis: 86 }],
  [28, { nombre: "Santa Teresa", idArcgis: 286 }],
  [30, { nombre: "Irueña", idArcgis: 402 }],
  [31, { nombre: "Águeda", idArcgis: 5 }],
])
