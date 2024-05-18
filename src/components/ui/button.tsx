import { FC } from "react";

type Props = {
  onClick?: () => void;
  children: string;
};
export const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <div className="" onClick={onClick}>
      {children}
    </div>
  );
};
