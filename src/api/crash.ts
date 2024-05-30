import { fetcher } from ".";

const placeBet = (amount: number) => fetcher.post("/crash/place_bet", amount);

export const crash = { placeBet };
