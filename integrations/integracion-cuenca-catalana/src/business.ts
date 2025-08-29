export const formatApiDate = (isoString: string): string => {
  const [datePart] = isoString.split('T'); // "2025-08-29"
  const [year, month, day] = datePart.split('-');
  return `${day}/${month}/${year}`;
};
