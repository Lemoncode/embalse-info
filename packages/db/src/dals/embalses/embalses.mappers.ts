import { InfoDestinoArcgis } from "db-model";

// Arcgis falta guadalhorce, o está agrupado guadalhorce con guadalteba?
// Arcgis falta Cueva de la Mora, Huelva
export const mapperFromCuencasMediterraneaToArcgis = new Map<
  number,
  InfoDestinoArcgis
>([
  [3, { nombre: "Charco Redondo", idArcgis: 746185 }],
  [8, { nombre: "Guadarranque", idArcgis: 746188 }],
  [269, { nombre: "Zahara-El Gastor", idArcgis: 745853 }],
  [270, { nombre: "Bornos", idArcgis: 745854 }],
  [271, { nombre: "Arcos de la Frontera", idArcgis: 745851 }],
  [272, { nombre: "Los Hurones", idArcgis: 745856 }],
  [273, { nombre: "Guadalcacín", idArcgis: 745855 }],
  [275, { nombre: "Barbate", idArcgis: 745852 }],
  [276, { nombre: "Celemín", idArcgis: 745850 }],
  [277, { nombre: "Almodóvar", idArcgis: 745857 }],
  [16, { nombre: "Concepción", idArcgis: 746191 }],
  [19, { nombre: "Casasola", idArcgis: 746189 }],
  [20, { nombre: "Limonero", idArcgis: 746194 }],
  [29, { nombre: "Guadalteba", idArcgis: 746193 }],
  [31, { nombre: "Conde del guadalhorce", idArcgis: 746192 }],
  [37, { nombre: "La Viñuela", idArcgis: 746195 }],
  [51, { nombre: "Rules", idArcgis: 746196 }],
  [64, { nombre: "Béznar", idArcgis: 746190 }],
  [58, { nombre: "Benínar", idArcgis: 746186 }],
  [84, { nombre: "Cuevas de Almanzora", idArcgis: 746187 }],
  [371, { nombre: "Chanza", idArcgis: 745904 }],
  [373, { nombre: "Piedras", idArcgis: 745873 }],
  [374, { nombre: "Machos", idArcgis: 745870 }],
  [376, { nombre: "Olivargas", idArcgis: 745872 }],
  [377, { nombre: "Corumbel Bajo", idArcgis: 745869 }],
  [379, { nombre: "Jarrama", idArcgis: 745875 }],
  [380, { nombre: "Andévalo", idArcgis: 745876 }],
]);
