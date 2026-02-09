export const mapStringToDateFormat = (strDate: string) => {
  const [year, month, day] = strDate.split(" ")[0].split('-');

  return `${day}/${month}/${year}`;
}
