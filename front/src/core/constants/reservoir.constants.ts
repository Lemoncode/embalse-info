import { Reservoir } from "@/common/models";

export const EMBALSES: Reservoir[] = [
  // Álava
  { id: "ullibarri-gamboa", name: "Ullibarri-Gamboa", provinciaId: "alava" },
  { id: "zadorra", name: "Zadorra", provinciaId: "alava" },
  { id: "urrúnaga", name: "Urrunaga", provinciaId: "alava" },
  { id: "maroño", name: "Maroño", provinciaId: "alava" },
  { id: "albina", name: "Albina", provinciaId: "alava" },
  { id: "santa-engracia", name: "Santa Engracia", provinciaId: "alava" },

  // Albacete
  { id: "camarillas", name: "Camarillas", provinciaId: "albacete" },
  { id: "fuensanta", name: "Fuensanta", provinciaId: "albacete" },
  { id: "talave", name: "Talave", provinciaId: "albacete" },
  { id: "cenajo", name: "Cenajo", provinciaId: "albacete" },
  { id: "almansa", name: "Almansa", provinciaId: "albacete" },

  // Alicante
  { id: "guadalest", name: "Guadalest", provinciaId: "alicante" },
  { id: "amadorio", name: "Amadorio", provinciaId: "alicante" },
  { id: "relleu", name: "Relleu", provinciaId: "alicante" },
  { id: "tibi", name: "Tibi", provinciaId: "alicante" },
  { id: "beniarres", name: "Beniarres", provinciaId: "alicante" },

  // Almería
  { id: "beninar", name: "Benínar", provinciaId: "almeria" },
  {
    id: "cuevas-almanzora",
    name: "Cuevas de Almanzora",
    provinciaId: "almeria",
  },
  { id: "isabel-ii", name: "Isabel II", provinciaId: "almeria" },

  // Asturias
  { id: "rioseco", name: "Rioseco", provinciaId: "asturias" },
  { id: "arbon", name: "Arbón", provinciaId: "asturias" },
  { id: "doiras", name: "Doiras", provinciaId: "asturias" },
  { id: "tanes", name: "Tanes", provinciaId: "asturias" },

  // Ávila
  { id: "burguillo", name: "Burguillo", provinciaId: "avila" },
  { id: "rosarito", name: "Rosarito", provinciaId: "avila" },
  { id: "fuente-el-azufre", name: "Fuente el Azufre", provinciaId: "avila" },

  // Badajoz
  { id: "cijara", name: "Cijara", provinciaId: "badajoz" },
  { id: "la-serena", name: "La Serena", provinciaId: "badajoz" },
  { id: "orellana", name: "Orellana", provinciaId: "badajoz" },
  { id: "zuja", name: "Zújar", provinciaId: "badajoz" },
  { id: "alange", name: "Alange", provinciaId: "badajoz" },
  { id: "garcia-sola", name: "García de Sola", provinciaId: "badajoz" },

  // Baleares
  { id: "cuber", name: "Cúber", provinciaId: "baleares" },
  { id: "gorg-blau", name: "Gorg Blau", provinciaId: "baleares" },

  // Barcelona
  { id: "sau", name: "Sau", provinciaId: "barcelona" },
  { id: "susqueda", name: "Susqueda", provinciaId: "barcelona" },
  { id: "la-baells", name: "La Baells", provinciaId: "barcelona" },
  {
    id: "la-llosa-del-cavall",
    name: "La Llosa del Cavall",
    provinciaId: "barcelona",
  },

  // Burgos
  { id: "ebro", name: "Ebro", provinciaId: "burgos" },
  { id: "uzquiza", name: "Úzquiza", provinciaId: "burgos" },

  // Cáceres
  { id: "alcantara", name: "Alcántara", provinciaId: "caceres" },
  { id: "valdecañas", name: "Valdecañas", provinciaId: "caceres" },
  { id: "gabriel-galan", name: "Gabriel y Galán", provinciaId: "caceres" },
  { id: "cedillo", name: "Cedillo", provinciaId: "caceres" },
  { id: "torrejon-tiétar", name: "Torrejón-Tíetar", provinciaId: "caceres" },

  // Cádiz
  { id: "guadarranque", name: "Guadarranque", provinciaId: "cadiz" },
  { id: "guadalcacin", name: "Guadalcacín", provinciaId: "cadiz" },
  { id: "los-hurones", name: "Los Hurones", provinciaId: "cadiz" },
  { id: "charco-redondo", name: "Charco Redondo", provinciaId: "cadiz" },

  // Cantabria
  { id: "ebro", name: "Ebro", provinciaId: "cantabria" },
  { id: "alsa", name: "Alsa", provinciaId: "cantabria" },

  // Castellón
  { id: "maria-cristina", name: "María Cristina", provinciaId: "castellon" },
  { id: "sitjar", name: "Sitjar", provinciaId: "castellon" },
  { id: "arenoso", name: "Arenoso", provinciaId: "castellon" },

  // Ciudad Real
  { id: "penarroya", name: "Peñarroya", provinciaId: "ciudad-real" },
  { id: "torre-abraham", name: "Torre de Abraham", provinciaId: "ciudad-real" },
  { id: "gasset", name: "Gasset", provinciaId: "ciudad-real" },

  // Córdoba
  { id: "iznajar", name: "Iznájar", provinciaId: "cordoba" },
  { id: "la-breña-ii", name: "La Breña II", provinciaId: "cordoba" },
  { id: "guadalmellato", name: "Guadalmellato", provinciaId: "cordoba" },
  { id: "puente-nuevo", name: "Puente Nuevo", provinciaId: "cordoba" },

  // La Coruña
  { id: "cecebre", name: "Cecebre", provinciaId: "la-coruna" },
  { id: "eume", name: "Eume", provinciaId: "la-coruna" },
  {
    id: "abegondo-cecebre",
    name: "Abegondo-Cecebre",
    provinciaId: "la-coruna",
  },

  // Cuenca
  { id: "alarcon", name: "Alarcón", provinciaId: "cuenca" },
  { id: "contreras", name: "Contreras", provinciaId: "cuenca" },
  { id: "la-toba", name: "La Toba", provinciaId: "cuenca" },
  { id: "buendia", name: "Buendía", provinciaId: "cuenca" },

  // Gerona
  { id: "sau", name: "Sau", provinciaId: "gerona" },
  { id: "boadella", name: "Boadella", provinciaId: "gerona" },
  { id: "darnius-boadella", name: "Darnius-Boadella", provinciaId: "gerona" },

  // Granada
  { id: "bermejales", name: "Bermejales", provinciaId: "granada" },
  { id: "canales", name: "Canales", provinciaId: "granada" },
  { id: "cubillas", name: "Cubillas", provinciaId: "granada" },
  { id: "quentar", name: "Quéntar", provinciaId: "granada" },

  // Guadalajara
  { id: "entrepeñas", name: "Entrepeñas", provinciaId: "guadalajara" },
  { id: "buendia", name: "Buendía", provinciaId: "guadalajara" },
  { id: "bolarque", name: "Bolarque", provinciaId: "guadalajara" },

  // Guipúzcoa
  { id: "artikutza", name: "Artikutza", provinciaId: "guipuzcoa" },
  { id: "ibiur", name: "Ibiur", provinciaId: "guipuzcoa" },

  // Huelva
  { id: "chanza", name: "Chanza", provinciaId: "huelva" },
  { id: "piedras", name: "Piedras", provinciaId: "huelva" },
  { id: "andévalo", name: "Andévalo", provinciaId: "huelva" },

  // Huesca
  { id: "yesa", name: "Yesa", provinciaId: "huesca" },
  { id: "grado", name: "Grado", provinciaId: "huesca" },
  { id: "mediano", name: "Mediano", provinciaId: "huesca" },
  { id: "el-grado", name: "El Grado", provinciaId: "huesca" },
  { id: "barasona", name: "Barasona", provinciaId: "huesca" },

  // Jaén
  { id: "tranco", name: "Tranco", provinciaId: "jaen" },
  { id: "guadalen", name: "Guadalén", provinciaId: "jaen" },
  { id: "jandula", name: "Jándula", provinciaId: "jaen" },
  { id: "rumblar", name: "Rumblar", provinciaId: "jaen" },

  // La Rioja
  { id: "mansilla", name: "Mansilla", provinciaId: "la-rioja" },
  { id: "gonzalez-lacasa", name: "González Lacasa", provinciaId: "la-rioja" },

  // Las Palmas
  { id: "soria", name: "Soria", provinciaId: "las-palmas" },
  { id: "ayagaures", name: "Ayagaures", provinciaId: "las-palmas" },

  // León
  { id: "riaño", name: "Riaño", provinciaId: "leon" },
  { id: "porma", name: "Porma", provinciaId: "leon" },
  { id: "barrios-luna", name: "Barrios de Luna", provinciaId: "leon" },
  { id: "villameca", name: "Villameca", provinciaId: "leon" },

  // Lérida
  { id: "rialb", name: "Rialb", provinciaId: "lerida" },
  { id: "santa-ana", name: "Santa Ana", provinciaId: "lerida" },
  { id: "oliana", name: "Oliana", provinciaId: "lerida" },
  { id: "camarasa", name: "Camarasa", provinciaId: "lerida" },

  // Lugo
  { id: "belesar", name: "Belesar", provinciaId: "lugo" },
  { id: "portodemouros", name: "Portodemouros", provinciaId: "lugo" },
  { id: "vilasouto", name: "Vilasouto", provinciaId: "lugo" },

  // Madrid
  { id: "el-atazar", name: "El Atazar", provinciaId: "madrid" },
  { id: "el-villar", name: "El Villar", provinciaId: "madrid" },
  { id: "santillana", name: "Santillana", provinciaId: "madrid" },
  { id: "valmayor", name: "Valmayor", provinciaId: "madrid" },
  { id: "pedrezuela", name: "Pedrezuela", provinciaId: "madrid" },

  // Málaga
  { id: "guadalhorce", name: "Guadalhorce", provinciaId: "malaga" },
  {
    id: "conde-guadalhorce",
    name: "Conde de Guadalhorce",
    provinciaId: "malaga",
  },
  { id: "guadalteba", name: "Guadalteba", provinciaId: "malaga" },
  { id: "la-viñuela", name: "La Viñuela", provinciaId: "malaga" },

  // Murcia
  { id: "cenajo", name: "Cenajo", provinciaId: "murcia" },
  { id: "talave", name: "Talave", provinciaId: "murcia" },
  { id: "alfonso-xiii", name: "Alfonso XIII", provinciaId: "murcia" },
  { id: "valdeinfierno", name: "Valdeinfierno", provinciaId: "murcia" },

  // Navarra
  { id: "yesa", name: "Yesa", provinciaId: "navarra" },
  { id: "irabia", name: "Irabia", provinciaId: "navarra" },
  { id: "alloz", name: "Alloz", provinciaId: "navarra" },
  { id: "eugui", name: "Eugui", provinciaId: "navarra" },

  // Orense
  { id: "as-conchas", name: "As Conchas", provinciaId: "orense" },
  { id: "frieira", name: "Frieira", provinciaId: "orense" },
  { id: "velle", name: "Velle", provinciaId: "orense" },

  // Palencia
  { id: "aguilar-campoo", name: "Aguilar de Campoo", provinciaId: "palencia" },
  { id: "cervera", name: "Cervera", provinciaId: "palencia" },
  { id: "camporredondo", name: "Camporredondo", provinciaId: "palencia" },

  // Pontevedra
  { id: "eiras", name: "Eiras", provinciaId: "pontevedra" },
  { id: "lerez", name: "Lérez", provinciaId: "pontevedra" },
  { id: "zamáns", name: "Zamáns", provinciaId: "pontevedra" },

  // Salamanca
  { id: "almendra", name: "Almendra", provinciaId: "salamanca" },
  { id: "santa-teresa", name: "Santa Teresa", provinciaId: "salamanca" },
  { id: "irueña", name: "Irueña", provinciaId: "salamanca" },

  // Santa Cruz de Tenerife
  { id: "chira", name: "Chira", provinciaId: "santa-cruz-de-tenerife" },

  // Segovia
  { id: "linares", name: "Linares", provinciaId: "segovia" },
  { id: "pontón-alto", name: "Pontón Alto", provinciaId: "segovia" },

  // Sevilla
  { id: "la-minilla", name: "La Minilla", provinciaId: "sevilla" },
  { id: "aracena", name: "Aracena", provinciaId: "sevilla" },
  { id: "jose-toran", name: "José Torán", provinciaId: "sevilla" },

  // Soria
  { id: "cuerda-del-pozo", name: "Cuerda del Pozo", provinciaId: "soria" },
  { id: "la-muedra", name: "La Muedra", provinciaId: "soria" },

  // Tarragona
  { id: "siurana", name: "Siurana", provinciaId: "tarragona" },
  { id: "riber", name: "Riudecanyes", provinciaId: "tarragona" },

  // Teruel
  { id: "santolea", name: "Santolea", provinciaId: "teruel" },
  { id: "gallipuen", name: "Gallipuén", provinciaId: "teruel" },

  // Toledo
  { id: "torcón", name: "Torcón", provinciaId: "toledo" },
  { id: "finisterre", name: "Finisterre", provinciaId: "toledo" },
  { id: "cazalegas", name: "Cazalegas", provinciaId: "toledo" },

  // Valencia
  { id: "tous", name: "Tous", provinciaId: "valencia" },
  { id: "benagéber", name: "Benagéber", provinciaId: "valencia" },
  { id: "contreras", name: "Contreras", provinciaId: "valencia" },
  { id: "loriguilla", name: "Loriguilla", provinciaId: "valencia" },

  // Valladolid
  { id: "encinas", name: "Encinas", provinciaId: "valladolid" },
  { id: "bajoz", name: "Bajoz", provinciaId: "valladolid" },

  // Vizcaya
  { id: "urrúnaga", name: "Urrunaga", provinciaId: "vizcaya" },
  { id: "arrieta", name: "Arrieta", provinciaId: "vizcaya" },

  // Zamora
  { id: "ricobayo", name: "Ricobayo", provinciaId: "zamora" },
  { id: "villalcampo", name: "Villalcampo", provinciaId: "zamora" },
  { id: "cernadilla", name: "Cernadilla", provinciaId: "zamora" },

  // Zaragoza
  { id: "mequinenza", name: "Mequinenza", provinciaId: "zaragoza" },
  { id: "la-tranquera", name: "La Tranquera", provinciaId: "zaragoza" },
  { id: "yesa", name: "Yesa", provinciaId: "zaragoza" },
];
