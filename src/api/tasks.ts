import { fetcher } from ".";

const getAll = () => fetcher.get("/missions/list");
const collect = (body: { mission_id: number; additional_parameter?: string }) =>
  fetcher.post("/missions/collect", body);

export const missions = { getAll, collect };
