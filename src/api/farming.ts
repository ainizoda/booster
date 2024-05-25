import { fetcher } from ".";

export const getStatus = () => fetcher.get("/farming/farming");
export const start = () => fetcher.post("/farming/start_farming");
export const collectReward = () => fetcher.post("/farming/collect_reward");
export const getBalance = () => fetcher.get("/user/balance");

export const farming = {
  getStatus,
  start,
  collectReward,
  getBalance,
};
