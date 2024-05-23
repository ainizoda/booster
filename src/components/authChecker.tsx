import { FC } from "react";
import { Navigate } from "react-router";

export const AuthChecker: FC = () => {
  if (localStorage.getItem("access_token")) {
    return <Navigate to="/home" />;
  }
  return <Navigate to="/welcome" />;
};
