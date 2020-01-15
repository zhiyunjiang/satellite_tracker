import backendClient from '../utils/backendClient';

export type CartographicDegrees = {
  lon: number;
  lat: number;
  alt: number;
};

export type GetOrbitalResponse = {
  epoch: string;
  availability: string;
  position: CartographicDegrees;
  cartographicDegrees: number[];
};

export const getOrbital = async () => {
  const res = await backendClient.get('orbitals');
  return res;
};
