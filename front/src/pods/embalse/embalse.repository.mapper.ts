import type { Embalse } from "db-model";
import { createEmptyEmbalse } from "./embalse.vm";

export const mapEmbalse = (embalse: Embalse) =>
  Boolean(embalse)
    ? {
        _id: embalse._id.toString(),
        embalse_id: embalse.embalse_id,
        nombre: embalse.nombre,
        slug: embalse.slug,
        cuenca: {
          _id: embalse.cuenca?._id?.toString() ?? "",
          nombre: embalse.cuenca?.nombre ?? "",
        },
        provincia: embalse.provincia ?? null,
        capacidad: embalse.capacidad,
        aguaActualAemet: embalse.aguaActualAemet ?? null,
        fechaMedidaAguaActualAemet: embalse.fechaMedidaAguaActualAemet ?? null,
        aguaActualSAIH: embalse.aguaActualSAIH ?? null,
        fechaMedidaAguaActualSAIH: embalse.fechaMedidaAguaActualSAIH ?? null,
        descripcion_id: embalse.descripcion_id ?? null,
        uso: embalse.uso ?? "",
      }
    : createEmptyEmbalse();
