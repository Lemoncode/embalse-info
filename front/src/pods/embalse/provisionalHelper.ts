export const getAverageByMonths = (
  arr: number[],
  totalCapacity: number,
): number => {
  const result = arr.reduce((total, value) => total + value, 0);
  return result / arr.length;
};
