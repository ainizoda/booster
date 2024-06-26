import { useEffect, useState } from "react";
import cls from "classnames";
import { TelegramShareButton } from "react-share";

import { settings } from "../api";
import { ListIcon, SpinnerSM } from "../components";
import { toast } from "../lib";
import { useCopy } from "../hooks";
import refferals from "../assets/reffferals.png";

export default function ReferralsPage() {
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [link, setLink] = useState<string>();
  const copy = useCopy();
  const copyLink = (link: string) => {
    if (!link) return;
    copy(link);
    toast("Referral link copied");
  };
  const getReferral = () => {
    setLoading(true);
    settings
      .getReferral()
      .then((res) => {
        setLink(res?.data?.referral_link);
      })
      .catch(() => {
        toast("failed to copy referral link", { error: true });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getReferral();
  }, []);
  return (
    <div className="flex flex-col items-center h-full">
      <div className="mt-16 flex flex-col items-center">
        {!imageLoaded && (
          <div className="animate-pulse mt-4">
            <div className="h-20 bg-gray-200 rounded-md dark:bg-gray-700 w-20"></div>
          </div>
        )}
        <img
          src={refferals}
          onLoad={() => {
            setImageLoaded(true);
          }}
        />
        <div className="mt-4 text-4xl font-bold text-center leading-10">
          Invite friends. Earn points.
        </div>
      </div>
      <div className="mt-12 self-start">
        <div className="text-lg font-bold">How it works</div>
        <div className="flex mt-6 pb-12">
          <div className="mt-4">
            <ListIcon />
          </div>
          <div className="pl-5 flex flex-col justify-between gap-6">
            <div>
              <div>Share your invitation link</div>
              <div className="text-[#ddd] text-sm">
                Spread the crypto among friends
              </div>
            </div>
            <div>
              <div>Your friends join Booster</div>
              <div className="text-[#ddd] text-sm">
                And start farming points
              </div>
            </div>
            <div>
              <div>Earn 10% of points farmed by friends</div>
              <div className="text-[#ddd] text-sm">
                Plus an extra 2.5% from their referrals
              </div>
            </div>
          </div>
        </div>
      </div>
      <TelegramShareButton
        disabled={loading}
        url={link!}
        className={cls(
          "mt-auto mb-5 text-center !p-3 w-full rounded-md !text-black",
          {
            "!bg-white": !loading,
            "!bg-[#232323] flex justify-center": loading,
          }
        )}
      >
        {loading ? <SpinnerSM /> : "Invite friends (5 left)"}
      </TelegramShareButton>
    </div>
  );
}
