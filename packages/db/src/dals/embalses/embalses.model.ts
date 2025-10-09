export interface Embalse {
  _id: string;
  embalse_id: number;
  nombre: string;
  cuenca: {
    _id: string;
    nombre: string;
  };
  provincia: string | null;
  capacidad: number;
  aguaActualAemet: number | null;
  fechaMedidaAguaActualAemet: Date | null;
  aguaActualSAIH: string | null;
  fechaMedidaAguaActualSAIH: Date | null;
  descripcion_id: string | null;
  uso: string;
}
