import { fetcher } from ".";

const getReferral = () => fetcher.get("/user/settings/referral_link");

export const settings = { getReferral };
