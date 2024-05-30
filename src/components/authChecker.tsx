import { FC, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router";

import { Loader } from "./ui";
import { auth } from "../api";
import { useWebAppData, useWebAppInitData } from "../contexts";

export const AuthChecker: FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const data = useWebAppData();
  const initData = useWebAppInitData();
  async function checkToken() {
    const res = await auth.isRegistered(data.user?.id || 5899795697);
    if (res.data?.registered) {
      auth
        .login({ data_check_string: initData })
        .then(() => {
          navigate("/home");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <Navigate to="/welcome" />;
};
