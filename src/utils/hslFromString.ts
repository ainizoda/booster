const hRange = [10, 500];
const sRange = [25, 70];
const lRange = [50, 70];

const normalizeHash = (hash: number, min: number, max: number) => {
  return Math.floor((hash % (max - min)) + min);
};

export const generateHSL = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const h = normalizeHash(hash, hRange[0], hRange[1]);
  const s = normalizeHash(hash, sRange[0], sRange[1]);
  const l = normalizeHash(hash, lRange[0], lRange[1]);

  return `hsl(${h}, ${s}%, ${l}%)`;
};
