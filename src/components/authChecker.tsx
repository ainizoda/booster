import { FC, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { me } from "../api";
import { Loader } from "./ui";

export const AuthChecker: FC<{ children: JSX.Element }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function checkToken() {
    me().then((res) => {
      if (res.data.id) {
        setLoading(false);
        navigate("/home");
      }
    });
  }

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return children;
};
