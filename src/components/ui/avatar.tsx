import { FC } from "react";
import cls from "classnames";

type Props = {
  className?: string;
  name: string;
};
export const Avatar: FC<Props> = ({ name, className }) => {
  return (
    <div
      className={cls(
        "bg-[#266FF1] w-32 h-32 flex justify-center items-center rounded-full text-5xl",
        className
      )}
    >
      {name}
    </div>
  );
};
