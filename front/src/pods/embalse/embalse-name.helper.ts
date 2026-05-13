const INVERTED_ARTICLE_PATTERN = /^(.+?),\s*(El|La|Los|Las)\b\s*(.*)$/;

export const formatEmbalseDisplayName = (rawName: string): string => {
  if (!rawName) return "";
  const match = rawName.match(INVERTED_ARTICLE_PATTERN);
  if (!match) return rawName.trim();

  const [, baseName, article, rest] = match;
  const cleanedRest = rest.replace(/^[-\s]+/, "").trim();
  const tail = cleanedRest ? ` ${cleanedRest}` : "";
  return `${article} ${baseName.trim()}${tail}`.replace(/\s+/g, " ").trim();
};
