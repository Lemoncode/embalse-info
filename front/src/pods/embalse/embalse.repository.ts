"use server";

import { getDb } from "@/lib/mongodb";
import type { Embalse } from "db-model";

export async function getEmbalseBySlug(slug: string): Promise<Embalse | null> {
    //conecta con BD y trae datos en base al slug
  const db = await getDb();
  const doc = await db.collection("embalses").findOne({ slug });

  if (!doc) {
    return null;
  }
    //mapea el resultado de la BD al tipo Embalse y nos aseguramos de que lleven los tipos correctos (tienen que ser primitivos)
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
  };
}
