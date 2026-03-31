import { generateMonthlyAverages } from './history.api.js';

export const run = async () => {
  const monthlyAverages = await generateMonthlyAverages();

  console.log(monthlyAverages);
}
