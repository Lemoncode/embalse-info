import { generateMonthlyAverages } from './history.api.js';
import { mapFromMonthyTenYearAgoToHistoryTenYearAgo } from './history.mappers.js';
import { dbServer, historyTenYearAgoRepository } from "@embalse-info/db";

export const run = async () => {
  try {
    const connectionString = process.env.MONGODB_CONNECTION_STRING;

    await dbServer.connect(connectionString);

    const monthlyAverages = await generateMonthlyAverages();
    const data = monthlyAverages.data;

    for (const key in data) {
      const historyTenYearAgo = mapFromMonthyTenYearAgoToHistoryTenYearAgo(key, data[key]);

      await historyTenYearAgoRepository.actualizarTenYearAgo(historyTenYearAgo);
    }
    dbServer.disconnect();
    console.log('Terminado');
  } catch (error) {
    console.error(error);
  }
}
