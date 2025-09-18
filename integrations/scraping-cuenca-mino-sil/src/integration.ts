import type { Embalse } from "@embalse-info/db";

export const getEstadoCuencaMinoSil = async (): Promise<Embalse[]> => {
  return [
    {
      id: "1",
      nombre: "Embalse de Belesar",
      provincia: "Lugo",
      capacidad: 3000000000,
      nivelActual: 2500000000,
      fechaUltimoNivel: new Date("2023-10-01"),
      porcentajeLlenado: 83.3,
    },
    {
      id: "2",
      nombre: "Embalse de Velle",
      provincia: "Ourense",
      capacidad: 500000000,
      nivelActual: 400000000,
      fechaUltimoNivel: new Date("2023-10-01"),
      porcentajeLlenado: 80.0,
    },
  ];
};
