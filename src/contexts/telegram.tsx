import { createContext, useContext, useEffect, useState } from "react";
import { TelegramWebApps } from "telegram-webapps-types";
import { paramsToObject } from "../utils";

const TelegramContext = createContext<TelegramWebApps.WebAppInitData>({});

const initDataMock =
  "user=%7B%22id%22%3A731037092%2C%22first_name%22%3A%22%D0%9B%D0%B5%D0%BD%D0%B0%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22lena_1_m%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=3129362873790084176&chat_type=private&start_param=ref_YWFhYQ%3D%3D&auth_date=1719605163&hash=73cbf929f80616eb6e2b1c35b566899818090fd565bf49715a6bca99dc1a5cc2";
// "user=%7B%22id%22%3A7114850637%2C%22first_name%22%3A%22%26%3B%5C%22%23%24%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22breadddybit%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=6425999764003773528&chat_type=sender&auth_date=1717143253&hash=e94b7bb1a8ba84007a6bbd1441bf6f305d4c5b0f138205649382a2a4d3664f4b";

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
    alert(webapp.initData);
  }, []);

  return (
    <TelegramContext.Provider value={data}>{children}</TelegramContext.Provider>
  );
};

export const useWebAppData = () => useContext(TelegramContext);
export const useWebAppInitData = () => Telegram.WebApp.initData || initDataMock;
