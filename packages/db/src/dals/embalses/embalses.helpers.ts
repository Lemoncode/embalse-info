export const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("/").map(Number);
  // Crea la fecha en UTC para evitar desfase por zona horaria
  return new Date(Date.UTC(year, month - 1, day));
};
