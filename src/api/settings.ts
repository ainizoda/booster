import { AxiosRequestConfig } from "axios";
import { fetcher } from ".";

const getReferral = () => fetcher.get("/user/settings/referral_link");
const putReferral = (link: string) =>
  fetcher.put(
    "/user/settings/referrer",
    {
      encoded_username: encodeURI(link.replace("ref_", "")),
    },
    { ignoreMessage: true } as AxiosRequestConfig
  );
const shareWallet = (address: string) =>
  fetcher.put("/user/settings/wallet", { wallet_address: address });

const shareEmail = (address: string) =>
  fetcher.put("/user/settings/email", { email: address });

export const settings = { getReferral, shareWallet, shareEmail, putReferral };
