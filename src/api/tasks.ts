import { AxiosRequestConfig } from "axios";
import { fetcher } from ".";

const getAll = () => fetcher.get("/missions/list");
const collect = (body: { mission_id: number; additional_parameter?: string }) =>
  fetcher.post("/missions/collect", body, {
    ignoreMessage: true,
  } as AxiosRequestConfig);

export const missions = { getAll, collect };
