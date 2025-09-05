// /packages/integrations/scraping-cuenca-duero/src/types.ts

// This interface defines the "shape" of our reservoir data object.
// We use 'export' so we can import and use it in other files.
export interface EmbalseDuero {
  id: number;
  embalse: string;
  capacidadActualHm3: number | null;
  volumenActualHm3: number | null;
}
