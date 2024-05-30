import { createContext, useContext, useEffect, useState } from "react";
import { TelegramWebApps } from "telegram-webapps-types";
import { paramsToObject } from "../utils";

const TelegramContext = createContext<TelegramWebApps.WebAppInitData>({});

const initDataMock =
  "user=%7B%22id%22%3A5899795697%2C%22first_name%22%3A%22Bob%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22akaibob%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2669375549145693865&chat_type=group&auth_date=1716205328&hash=e040ff7a44dd7d8ee8d0507fc28afc84403eac6e05a6488bba9baeff856edd30";

export const TelegramProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const webapp = Telegram.WebApp;
    webapp.ready();
    webapp.expand();
    setData(paramsToObject(webapp.initData || initDataMock));
  }, []);

  return (
    <TelegramContext.Provider value={data}>{children}</TelegramContext.Provider>
  );
};

export const useWebAppData = () => useContext(TelegramContext);
export const useWebAppInitData = () => Telegram.WebApp.initData || initDataMock;
