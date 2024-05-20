import { useRef } from "react";
import { AnyFunc, Args } from "./types";

export const useDebounce = <T extends AnyFunc>(func: T, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  return (...args: Args<T>): Promise<ReturnType<T>> => {
    clearTimeout(timer.current);

    return new Promise<ReturnType<T>>((resolve, reject) => {
      timer.current = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
};
