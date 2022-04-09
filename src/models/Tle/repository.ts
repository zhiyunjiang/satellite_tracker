import axios from 'axios';
import { Tle } from './types';

const TleRepository = () => {
  const find = async (name: string): Promise<Tle> => {
    const res = await axios.get<string>(
      'https://celestrak.com/NORAD/elements/active.txt'
    );
    const data = res.data;
    const lines = data.split(/\r\n|\n/);

    let idx = 0;
    while (idx + 2 < lines.length) {
      const line1 = lines[idx].trim();
      if (line1.toUpperCase() === name.toUpperCase()) {
        return {
          name: lines[idx].trim(),
          line1: lines[idx + 1].trim(),
          line2: lines[idx + 2].trim(),
        };
      }
      idx += 3;
    }

    throw new Error('TLE is not found.');
  };

  return { find };
};

export default TleRepository;
