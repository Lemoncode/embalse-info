// For now, we return mock data for testing purposes
export const getEstadoCuencaDuero = async (): Promise<any> => {
  return [
    {
      id: 1,
      name: 'Duero Test Reservoir 1',
      currentWaterLevel: 500,
      capacity: 1000,
    },
    {
      id: 2,
      name: 'Duero Test Reservoir 2',
      currentWaterLevel: 750,
      capacity: 1500,
    },
  ];
};