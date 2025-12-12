export interface ReservoirData {
  currentVolume: number;
  totalCapacity: number;
  measurementDate: string;
}

export const mockData: ReservoirData = {
  currentVolume: 1500,
  totalCapacity: 50000,
  measurementDate: "25/12/2025",
};
