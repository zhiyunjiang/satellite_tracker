import axios from 'axios';

export const getTleLines = async (satelliteName: string) => {
  const res = await axios.get<string>(
    'https://celestrak.com/NORAD/elements/active.txt'
  );
  if (res.status >= 400) {
    throw new Error('TLE is not found.');
  }
  const data = res.data;
  const lines = data.split(/\r\n|\n/);

  let idx = 0;
  while (idx + 2 < lines.length) {
    const line1 = lines[idx].trim();
    if (line1.toUpperCase() === satelliteName.toUpperCase()) {
      return {
        line1: lines[idx + 1].trim(),
        line2: lines[idx + 2].trim(),
      };
    }
    idx += 3;
  }

  throw new Error('TLE is not found.');
};
