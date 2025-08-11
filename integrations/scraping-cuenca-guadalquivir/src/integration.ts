import { EmbalseUpdateSAIHEntity } from "db-model";

export const getEstadoCuencaGuadalquivir = async (): Promise<
  EmbalseUpdateSAIHEntity[]
> => {
  return [
    {
      id: 1,
      nombre: "Embalse El Tranco de Beas",
      aguaActualSAIH: 60000000,
      fechaMedidaSAIH: "2025-08-11",
    },
    {
      id: 2,
      nombre: "Embalse El Portillo ",
      aguaActualSAIH: 40000000,
      fechaMedidaSAIH: "2025-08-11",
    },
  ];
};
