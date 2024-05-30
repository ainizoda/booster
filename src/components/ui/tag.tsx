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
      className="w-11 p-2 rounded-md text-xs flex justify-center items-center"
    >
      {value}
    </div>
  );
};
