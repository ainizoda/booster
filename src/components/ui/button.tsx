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
        className,
        "w-full text-center p-3 bg-white text-black rounded-md text-xl hover:opacity-75 cursor-pointer"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
