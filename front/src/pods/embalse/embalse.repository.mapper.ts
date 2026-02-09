
import type { Embalse } from "db-model";
export function repositoryMapper(doc: Embalse) {

    return {
        _id: doc._id.toString(),
        embalse_id: doc.embalse_id,
        nombre: doc.nombre,
        slug: doc.slug,
        cuenca: {
        _id: doc.cuenca?._id?.toString() ?? "",
        nombre: doc.cuenca?.nombre ?? "",
        },
        provincia: doc.provincia ?? null,
        capacidad: doc.capacidad,
        aguaActualAemet: doc.aguaActualAemet ?? null,
        fechaMedidaAguaActualAemet: doc.fechaMedidaAguaActualAemet ?? null,
        aguaActualSAIH: doc.aguaActualSAIH ?? null,
        fechaMedidaAguaActualSAIH: doc.fechaMedidaAguaActualSAIH ?? null,
        descripcion_id: doc.descripcion_id ?? null,
        uso: doc.uso ?? "",
    }
}