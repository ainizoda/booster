import { FC } from "react";
import cls from "classnames";

type Props = {
  onClick?: () => void;
  children: string;
  className?: string;
};
export const Button: FC<Props> = ({ children, onClick, className }) => {
  return (
    <div
      className={cls(
        "w-full text-center p-3 bg-white text-black rounded-md text-xl hover:opacity-75",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
