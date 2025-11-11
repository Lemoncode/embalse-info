import { getCuencasContext } from "./cuencas.context.js";
import { Cuenca } from "db-model";

export const cuencasRepository = {
  actualizarCuencas: async (cuentas: Cuenca[]): Promise<boolean> => {
    const { ok } = await getCuencasContext().bulkWrite(
      cuentas.map((cuenca) => ({
        updateOne: {
          filter: { _id: cuenca._id },
          update: { $set: cuenca },
          upsert: true,
        },
      }))
    );

    return ok === 1;
  },
};
