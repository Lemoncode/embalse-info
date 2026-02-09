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

// OJO Pasteral, Sant Ponç, Gaià, Siurana, Foix, Cavallers

export const mapperFromCuencasCatalanaToArcgis = new Map<
  number,
  InfoDestinoArcgis
>([
  [171169001, { nombre: "Susqueda", idArcgis: 301 }],
  [170600001, { nombre: "Boadella", idArcgis: 53 }],
  [430537001, { nombre: "Riudecanyes", idArcgis: 259 }],
  [83036001, { nombre: "Sau", idArcgis: 290 }],
  [81419003, { nombre: "La Llosa del Cavall", idArcgis: 178 }],
  [82687001, { nombre: "La Baells", idArcgis: 36 }],
]);
