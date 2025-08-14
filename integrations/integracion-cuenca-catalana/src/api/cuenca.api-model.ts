export interface EmbalseCatalanApi {
  value: number;
  alert: number;
  time: string;
  location: string;
  component: string;
  type: string;
  network: string;
  status: string;
  name: string;
  unit: string;
  signal: string;
  popup: {
    level: {
      value: number;
      unit: string;
      time: string;
      signal: string;
    };
    volume: {
      value: number;
      unit: string;
      time: string;
      signal: string;
    };
    capacity: {
      value: number;
      unit: string;
      time: string;
      signal: string;
    };
  };
}
