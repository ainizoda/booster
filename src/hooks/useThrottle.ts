import { useRef } from "react";
import { AnyFunc, Args } from "./types";

export const useThrottle = <T extends AnyFunc>(func: T, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const called = useRef<boolean>(false);

  return (...args: Args<T>) => {
    if (called.current) {
      return;
    }
    func.apply(this, args);
    called.current = true;

    timer.current = setTimeout(() => {
      clearTimeout(timer.current);
      called.current = false;
    }, delay);
  };
};
