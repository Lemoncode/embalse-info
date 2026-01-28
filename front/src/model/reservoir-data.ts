export interface DatosEmbalse {
  Cuenca: string;
  Provincia: string;
  Municipio: string;
  Rio: string;
  EmbalsesAguasAbajo: number;
  TipoDePresa: string;
  AnioConstruccion: number;
  Superficie: number;
  Localizacion: string;
}
export interface ReservoirInfo {
Description: string;
}

export interface ReservoirData {
  currentVolume: number;
  totalCapacity: number;
  measurementDate: string;
  datosEmbalse: DatosEmbalse;
  reservoirInfo : ReservoirInfo;
}


export const mockData: ReservoirData = {
  currentVolume: 1500,
  totalCapacity: 50000,
  measurementDate: "25/12/2025",
  datosEmbalse:{
    Cuenca: "Cuenca Ejemplo",
    Provincia: "Provincia Ejemplo",
    Municipio: "Municipio Ejemplo",
    Rio: "Río Ejemplo",
    EmbalsesAguasAbajo: 3,
    TipoDePresa: "Tipo Ejemplo",
    AnioConstruccion: 1990,
    Superficie: 250,
    Localizacion: "Localización Ejemplo"
  },  
  reservoirInfo: {
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
  
};
