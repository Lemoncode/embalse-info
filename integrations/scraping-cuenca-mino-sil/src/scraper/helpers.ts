export const mapStringToApiDate = (strDate: string) => {
  const [day, month, year] = strDate.split(" ")[0].split('/');

  return `${day}/${month}/${year}`;
}
