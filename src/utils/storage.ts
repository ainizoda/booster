interface Storage<V = string> {
  get(key: string): V;
  set(key: string, value: V): void;
}

export const storage: Storage = {
  get(key) {
    const val = sessionStorage.getItem(key);
    if (val === null) {
      // throw new Error(`storage: value with key \`${key}\` not found`);
      return
    }
    return val;
  },
  set(key, val) {
    sessionStorage.setItem(key, val);
  },
};
