import { FC, memo, useMemo } from "react";
import cls from "classnames";
import { useWebAppData } from "../contexts";
import { generateHSL } from "../utils";

type Props = {
  className?: string;
  name?: string;
};
export const Avatar: FC<Props> = memo(({ className, name }) => {
  const { user } = useWebAppData() as any;
  const shortName = useMemo(
    () => (user?.first_name[0] || "") + (user?.last_name?.[0] || ""),
    [user]
  );
  const avatarText = useMemo(() => name?.[0]?.toUpperCase() || shortName, [name, shortName]);
  const avatarHashText = useMemo(() => name || user?.username, [name, user]);
  const color = useMemo(() => generateHSL(avatarHashText), [avatarHashText]);
  return (
    <div
      style={{ backgroundColor: color }}
      className={cls(
        `w-32 h-32 flex justify-center items-center rounded-full text-5xl font-bold`,
        className
      )}
    >
      {avatarText}
    </div>
  );
});
