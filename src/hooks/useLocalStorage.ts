import { useMemo } from "react";

type PrevValueCallback<V> = (prev?: V) => V;
type SetAction<V> = V | PrevValueCallback<V>;

type Methods<K extends string, V> = {
  [key in `get${Capitalize<K>}`]: () => V | null;
} & {
  [key in `set${Capitalize<K>}`]: (action: SetAction<V>) => void;
};

const invalidValueTypes = ["function", "undefined", "symbol"];
type ValueTypes = string | number | bigint | boolean | object;

// type DefaultValues = {
//   string: string;
//   number: number;
//   bigint: bigint;
//   boolean: boolean;
//   object: object;
// };

// const defaultValues: DefaultValues = {
//   string: "",
//   number: 0,
//   bigint: BigInt(0),
//   boolean: false,
//   object: {},
// };

export const useLocalStorage = <K extends string, V extends ValueTypes>(
  key: K,
  initialValue?: V
): Methods<K, V> => {
  const get = (): V | null => {
    const value = localStorage.getItem(key);
    const parsed = JSON.parse(value || "null") as V | null;

    if (value === null) {
      return initialValue || null;
    }
    return parsed;
  };

  const set = (action: SetAction<V>) => {
    if (typeof action === "function") {
      return (action as PrevValueCallback<V>)(get() || undefined);
    }
    if (invalidValueTypes.includes(typeof action)) {
      throw new Error(
        `useLocalStorage: cannot store value with type \`${typeof action}\``
      );
    }
    localStorage.setItem(key, JSON.stringify(action));
    return action;
  };

  const capitalizedKey = useMemo(
    () => key.charAt(0).toUpperCase() + key.slice(1),
    [key]
  );

  return {
    [`get${capitalizedKey}`]: get,
    [`set${capitalizedKey}`]: set,
  } as Methods<K, V>;
};
