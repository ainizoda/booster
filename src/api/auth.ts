import { AxiosRequestConfig } from "axios";
import { fetcher } from ".";
import { storage } from "../utils";

export interface ICheckNickname {
  available: boolean;
  message: string;
}
const checkNickname = (name: string) =>
  fetcher
    .get<ICheckNickname>(
      "/user/settings/username/check?username=" + encodeURIComponent(name)
    )
    .then((res) => res.data);

const updateUsername = (name: string) =>
  fetcher.put("/user/settings/username", { username: name });

const login = (data: { data_check_string: string }) =>
  fetcher
    .post("/auth/telegram/authenticate", data, {
      ignoreToken: true,
    } as AxiosRequestConfig)
    .then((res) => {
      storage.set("access_token", res.data.access_token);
      storage.set("refresh_token", res.data.refresh_token);
      return res;
    });

const refreshToken = (oldToken: string): Promise<string> =>
  fetcher
    .post("/auth/token/refresh", {
      refresh_token: oldToken,
    })
    .then((res) => res.data.access_token);

const isRegistered = (userId: number) =>
  fetcher.get("/auth/is_registered?user_id=" + userId, {
    ignoreToken: true,
  } as AxiosRequestConfig);

const me = () => fetcher.get("/auth/me");

export const auth = {
  checkNickname,
  updateUsername,
  login,
  refreshToken,
  me,
  isRegistered,
};
