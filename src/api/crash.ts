import { fetcher } from ".";

const placeBet = (amount: number) =>
  fetcher.post("/crash/place_bet", { amount });

export interface GameTiming {
  current_time: Date;
  betting_close_time: Date;
}
const getGameTiming = () => fetcher<GameTiming>("/crash/game_timing");

export interface Bet {
  user_id: string;
  amount: number;
  time: Date;
  cash_out_multiplier: number;
  cash_out_datetime: Date;
  result: string;
  username: string;
}
const getBets = () => fetcher.get<Bet[]>("/crash/bets");

const cancelBet = () => fetcher.delete<{ detail: string }>("/crash/cancel_bet");

const cashout = (multiplier: number) =>
  fetcher.post("/crash/cash_out", { multiplier });

export interface LastGameResults {
  result: number;
  hash: string;
  betting_close_time: Date;
}
const getLastGameResults = () =>
  fetcher.get<LastGameResults>("/crash/last_game_result");

export interface Game {
  id: number;
  game_hash: string;
  result: number;
  start_time: Date;
  end_time: Date;
  bets: {
    id: number;
    user_id: string;
    username: string;
    amount: number;
    time: Date;
    hash: string;
    cash_out_multiplier: number;
    cash_out_datetime: Date;
    result: "win" | "lose";
  }[];
  total_bet_amount: number;
}
const getGames = (limit: number = 5) =>
  fetcher.get<Game[]>("/crash/games?limit=" + limit);

export const crash = {
  placeBet,
  getGameTiming,
  getBets,
  cancelBet,
  cashout,
  getLastGameResults,
  getGames,
};
