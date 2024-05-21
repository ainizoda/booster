import { FC } from "react";
import spinner from "../../assets/spinner.svg";

export const Loader: FC = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center z-50 fixed left-0 top-0">
      <img src={spinner} alt="spinner" />
    </div>
  );
};
