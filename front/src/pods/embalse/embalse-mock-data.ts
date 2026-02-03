import { ReservoirData } from "./embalse.vm";

export const MOCK_DATA: ReservoirData = {
  nombre: "Embalse Ejemplo",
  currentVolume: 1500,
  totalCapacity: 50000,
  measurementDate: "25/12/2025",
  datosEmbalse: {
    cuenca: "Cuenca Ejemplo",
    provincia: "Provincia Ejemplo",
    municipio: "Municipio Ejemplo",
    rio: "Río Ejemplo",
    embalsesAguasAbajo: 3,
    tipoDePresa: "Tipo Ejemplo",
    anioConstruccion: 1990,
    superficie: 250,
    localizacion: "Localización Ejemplo",
  },
  reservoirInfo: {
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
};
