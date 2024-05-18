import { FC, useMemo } from "react";
import cls from "classnames";
import { useWebAppData } from "../contexts";

type Props = {
  className?: string;
};
export const Avatar: FC<Props> = ({ className }) => {
  const { user } = useWebAppData();
  const shortName = useMemo(
    () => (user?.first_name[0] || "") + (user?.last_name?.[0] || ""),
    [user]
  );
  return (
    <div
      className={cls(
        "bg-[#266FF1] w-32 h-32 flex justify-center items-center rounded-full text-5xl font-bold",
        className
      )}
    >
      {shortName}
    </div>
  );
};
