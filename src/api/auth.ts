import { fetcher } from ".";

export interface ICheckNickname {
  available: boolean;
  message: string;
}
const checkNickname = (name: string) =>
  fetcher
    .get<ICheckNickname>(
      "/user/settings/username/check?username=" + encodeURIComponent(name)
    )
    .then((res) => res.data)
    .catch((err) => {
      alert(JSON.stringify(err));
    });

const updateUsername = (name: string) =>
  fetcher.put("/user/settings/username", { username: name });

const register = (data: { data_check_string: string }) =>
  fetcher.post("/auth/telegram/authenticate", data);

const refreshToken = (oldToken: string): Promise<string> =>
  fetcher
    .post("/auth/token/refresh", {
      refresh_token: oldToken,
    })
    .then((res) => res.data.access_token);

const me = () => fetcher.get("/auth/me");

export const auth = {
  checkNickname,
  updateUsername,
  register,
  refreshToken,
  me,
};
