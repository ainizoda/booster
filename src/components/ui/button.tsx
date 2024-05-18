import { FC } from "react";

type Props = {
  onClick?: () => void;
  children: string;
};
export const Button: FC<Props> = ({ children, onClick }) => {
  return <div onClick={onClick}>{children}</div>;
};
