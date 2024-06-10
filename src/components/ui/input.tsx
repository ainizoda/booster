import { FC } from "react";
import cls from "classnames";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  icon?: JSX.Element;
  startIcon?: JSX.Element;
};
export const Input: FC<Props> = ({ className, icon, startIcon, ...props }) => {
  return (
    <div
      className={cls(
        "flex items-center py-2 rounded-md w-full bg-[#1C1C1E] text-white",
        {
          "pr-7": Boolean(!icon),
          "pr-3": Boolean(icon),
          "pl-6": Boolean(!startIcon),
          "pl-2": Boolean(startIcon),
        },
        className
      )}
    >
      <div className="pr-2">{startIcon}</div>
      <input
        className="w-full block bg-transparent"
        autoComplete="off"
        spellCheck="false"
        autoCorrect="off"
        {...props}
      />
      {icon}
    </div>
  );
};
