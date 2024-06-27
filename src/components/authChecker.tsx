import { FC, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { TelegramWebApps } from "telegram-webapps-types";

import { Loader } from "./ui";
import { auth } from "../api";
import { useWebAppData, useWebAppInitData } from "../contexts";

type NavigateProps = {
  navigateOnSuccess?: string;
  renderOnSuccess?: never;
};

type RenderProps = {
  renderOnSuccess?: JSX.Element;
  navigateOnSuccess?: never;
};

export const AuthChecker: FC<RenderProps | NavigateProps> = ({
  navigateOnSuccess,
  renderOnSuccess,
}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const data = useWebAppData();
  const initData = useWebAppInitData();

  async function checkToken(data: TelegramWebApps.WebAppInitData) {
    if (!data?.user?.id) return;

    try {
      const res = await auth.isRegistered(data?.user?.id);

      if (res?.data?.registered) {
        alert(initData);
        const data = await auth.login({ data_check_string: initData });
        alert(JSON.stringify(data.data));
        return;
      }
      navigate("/welcome");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkToken(data);
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return navigateOnSuccess ? (
    <Navigate to={navigateOnSuccess} />
  ) : (
    renderOnSuccess
  );
};
