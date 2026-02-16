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

// Ojo Embalse de La Florida-Pilotuerto, Valdemurio, El Furacón, Priañes, Cordiñanes, La Lastra, Palombera, Arriarán, Leurtza Inferior, Leurtza Superior

// id => 272 Está en la cuenca cantábrico oriental, pero está en la provincia de Almería. He investigado y está en Navarra.

export const mapperFromCuencasCantabricoToArcgis = new Map<
  number,
  InfoDestinoArcgis
>([
  [1406, { nombre: "Salime", idArcgis: 270 }],
  [1408, { nombre: "Doiras", idArcgis: 121 }],
  [1409, { nombre: "Arbón", idArcgis: 26 }],
  [1356, { nombre: "La Barca", idArcgis: 40 }],
  [1333, { nombre: "Tanes", idArcgis: 305 }],
  [1334, { nombre: "Rioseco", idArcgis: 385 }],
  [1345, { nombre: "Alfilorios", idArcgis: 17 }],
  [1253, { nombre: "La Cohilla", idArcgis: 103 }],
  [1231, { nombre: "Alsa - Mediajo", idArcgis: 310 }],
  [1177, { nombre: "Ordunte", idArcgis: 217 }],
  [1078, { nombre: "Ibiur", idArcgis: 377 }],
  [1108, { nombre: "Añarbe", idArcgis: 34 }],
  [1847, { nombre: "San Antón", idArcgis: 272 }],
]);

// OJO Pasteral, Gaià, Siurana, Foix

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
  [250753004, { nombre: "Sant Pons", idArcgis: 280 }],

]);

// OJO Aguilar de Campoo, Cernadilla, Puente Porto, Ricobayo, Rábanos, Saucelle, Valparaíso, Las Vencías, Villagonzalo, Villalcampo, Nª Sª de Agavanzal, Aldeadávila, Almendra, Burgomillodo, Casares de Arbas, Aguilar, Serones, San José

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
  [87, { nombre: "Castro", idArcgis: 26 }],
])

// OJO Guadanuño, Hornachuelos, Derivación Retortillo, Dañador, Encinarejo, El Infierno, El Renegado, Balsa Las Adelfas Contraemb. Bermejales, La Torre del Águila

export const mapperFromCuencasGuadalquivirToArcgis = new Map<
  number,
  InfoDestinoArcgis
>([
  [26, { nombre: "Yeguas", idArcgis: 348 }],
  [27, { nombre: "Martín Gonzalo", idArcgis: 196 }],
  [28, { nombre: "Arenoso", idArcgis: 373 }],
  [29, { nombre: "Guadalmellato", idArcgis: 155 }],
  [30, { nombre: "San Rafael Navallana", idArcgis: 267 }],
  [32, { nombre: "Vadomojón", idArcgis: 327 }],
  [33, { nombre: "Sierra Boyera", idArcgis: 295 }],
  [34, { nombre: "Puente Nuevo", idArcgis: 281 }],
  [36, { nombre: "La Breña II", idArcgis: 376 }],
  [37, { nombre: "Bembézar", idArcgis: 48 }],
  [39, { nombre: "Retortillo", idArcgis: 253 }],
  [48, { nombre: "Iznájar", idArcgis: 171 }],
  [3, { nombre: "San Clemente", idArcgis: 274 }],
  [4, { nombre: "El Portillo", idArcgis: 235 }],
  [5, { nombre: "La Bolera", idArcgis: 55 }],
  [6, { nombre: "Negratín", idArcgis: 211 }],
  [7, { nombre: "Francisco Abellán", idArcgis: 134 }],
  [41, { nombre: "Canales", idArcgis: 75 }],
  [42, { nombre: "Quéntar", idArcgis: 247 }],
  [44, { nombre: "Colomera", idArcgis: 104 }],
  [45, { nombre: "Cubillas", idArcgis: 115 }],
  [46, { nombre: "Los Bermejales", idArcgis: 52 }],
  [1, { nombre: "El Tranco de Beas", idArcgis: 316 }],
  [2, { nombre: "Aguascebas", idArcgis: 4 }],
  [8, { nombre: "Siles", idArcgis: 383 }],
  [13, { nombre: "Guadalén", idArcgis: 157 }],
  [14, { nombre: "La Fernandina", idArcgis: 135 }],
  [15, { nombre: "Guadalmena", idArcgis: 156 }],
  [16, { nombre: "Giribaile", idArcgis: 148 }],
  [17, { nombre: "Quiebrajano", idArcgis: 248 }],
  [19, { nombre: "Rumblar", idArcgis: 264 }],
  [21, { nombre: "Fresneda", idArcgis: 141 }],
  [22, { nombre: "Montoro III", idArcgis: 207 }],
  [23, { nombre: "Jándula", idArcgis: 175 }],
  [31, { nombre: "Víboras", idArcgis: 359 }],
  [54, { nombre: "José Torán", idArcgis: 174 }],
  [55, { nombre: "La Puebla de Cazalla", idArcgis: 241 }],
  [56, { nombre: "Huesna", idArcgis: 166 }],
  [57, { nombre: "El Pintado", idArcgis: 231 }],
  [58, { nombre: "Los Melonares", idArcgis: 382 }],
  [61, { nombre: "Aracena", idArcgis: 25 }],
  [62, { nombre: "Zufre", idArcgis: 351 }],
  [63, { nombre: "La Minilla", idArcgis: 201 }],
  [64, { nombre: "Cala", idArcgis: 69 }],
  [65, { nombre: "Gergal", idArcgis: 147 }],
  [67, { nombre: "El Agrio", idArcgis: 3 }],
  [68, { nombre: "La Torre del Águila", idArcgis: 312 }],
  [1, { nombre: "El Tranco de Beas", idArcgis: 316 }],
  [4, { nombre: "El Portillo", idArcgis: 235 }],
  [6, { nombre: "Negratín", idArcgis: 211 }],
  [8, { nombre: "Siles", idArcgis: 383 }],
  [13, { nombre: "Guadalén", idArcgis: 157 }],
  [14, { nombre: "La Fernandina", idArcgis: 135 }],
  [15, { nombre: "Guadalmena", idArcgis: 156 }],
  [16, { nombre: "Giribaile", idArcgis: 148 }],
  [23, { nombre: "Jándula", idArcgis: 175 }],
  [26, { nombre: "Yeguas", idArcgis: 348 }],
  [28, { nombre: "Arenoso", idArcgis: 373 }],
  [30, { nombre: "San Rafael Navallana", idArcgis: 267 }],
  [32, { nombre: "Vadomojón", idArcgis: 327 }],
  [34, { nombre: "Puente Nuevo", idArcgis: 242 }],
  [36, { nombre: "La Breña II", idArcgis: 376 }],
  [48, { nombre: "Iznájar", idArcgis: 171 }],
  [54, { nombre: "José Torán", idArcgis: 174 }],
  [55, { nombre: "La Puebla de Cazalla", idArcgis: 241 }],
])

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
