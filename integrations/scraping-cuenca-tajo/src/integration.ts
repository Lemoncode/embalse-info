import type { EmbalseUpdateSAIHEntity } from "db-model";

export const scrapeCuencaTajo = async (
  url: string
): Promise<EmbalseUpdateSAIHEntity[]> => {
  return [
    {
      id: 1,
      nombre: "Embalse de Navamuño",
      aguaActualSAIH: 2500000000,
      fechaMedidaSAIH: "03/09/2025",
    },
    {
      id: 2,
      nombre: "Embalse de Baños",
      aguaActualSAIH: 400000000,
      fechaMedidaSAIH: "03/09/2025",
    },
  ];
};
