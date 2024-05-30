interface Storage<V = string> {
  get(key: string): V;
  set(key: string, value: V): void;
}

export const storage: Storage = {
  get(key) {
    const val = localStorage.getItem(key);
    if (val === null) {
      throw new Error(`storage: value with key \`${key}\` not found`);
    }
    return val;
  },
  set(key, val) {
    localStorage.setItem(key, val);
  },
};
