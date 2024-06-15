import { FC, useMemo } from "react";

type Props = {
  color: "blue" | "black" | "pink" | "green";
  value: string;
};

export const Tag: FC<Props> = ({ color, value }) => {
  const colors = useMemo(
    () => ({
      green: "#78E6A4",
      blue: "#6587FF",
      pink: "#8E7BFF",
      black: "#FF7070",
    }),
    []
  );
  return (
    <div
      style={{
        color: colors[color],
        backgroundColor: color === "black" ? "#ffffff18" : colors[color] + "40",
      }}
      className="py-2 px-3 rounded-md text-xs flex justify-center items-center cursor-default hover:opacity-85"
    >
      {value}
    </div>
  );
};
