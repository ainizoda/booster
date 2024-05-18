import { createContext, useContext, useEffect, useState } from "react";
import { TelegramWebApps } from "telegram-webapps-types";
import { paramsToObject } from "../utils";

export const TelegramContext = createContext<TelegramWebApps.WebAppInitData>(
  {}
);

export const TelegramProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [data, setData] = useState({});

  const webapp = Telegram.WebApp;

  useEffect(() => {
    webapp.ready();
    webapp.expand();
    setData(paramsToObject(webapp.initData));
  }, []);

  return (
    <TelegramContext.Provider value={data}>{children}</TelegramContext.Provider>
  );
};

export const useWebAppData = () => useContext(TelegramContext);
