import { FC, memo, useMemo } from "react";
import cls from "classnames";
import { useWebAppData } from "../contexts";
import { generateHSL } from "../utils";

type Props = {
  className?: string;
  name?: string;
};
export const Avatar: FC<Props> = memo(({ className, name }) => {
  const appData = useWebAppData() as any;
  const shortName = useMemo(
    () => (appData?.user?.first_name[0] || "") + (appData?.user?.last_name?.[0] || ""),
    [appData]
  );
  const avatarText = useMemo(() => name?.[0]?.toUpperCase() || shortName, [name, shortName]);
  const avatarHashText = useMemo(() => name || appData?.user?.username, [name, appData]);
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
