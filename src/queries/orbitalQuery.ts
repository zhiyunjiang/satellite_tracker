import backendClient from '../utils/backendClient';

export const getCurrentPosition = async () => {
  const res = await backendClient.get('/api/positions');
  return res;
};
