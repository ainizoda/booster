import { FC, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router";

import { Loader } from "./ui";
import { auth } from "../api";

export const AuthChecker: FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function checkToken() {
    auth.me().then((res) => {
      if (res.data?.id) {
        navigate("/home");
      }
    })
    .finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <Navigate to="/welcome" />;
};
