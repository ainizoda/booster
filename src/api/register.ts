import { fetcher } from ".";

export interface ICheckNickname {
  available: boolean;
  message: string;
}
export const checkNickname = (name: string) =>
  fetcher
    .get<ICheckNickname>(
      "/user/settings/username/check?username=" + encodeURIComponent(name)
    )
    .then((res) => res.data)
    .catch((err) => {
      alert(JSON.stringify(err));
    });

export const updateUsername = (name: string) =>
  fetcher.put("/user/settings/username", { username: name });

export const authenticate = (data: { data_check_string: string }) =>
  fetcher.post("/auth/telegram/authenticate", data);

export const refreshToken = (): Promise<string> =>
  fetcher
    .post("/auth/token/refresh", {
      refresh_token: localStorage.getItem("refresh_token"),
    })
    .then((res) => res.data.access_token);
