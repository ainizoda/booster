import { settings } from "../api";
import { ListIcon } from "../components";
import refferals from "../assets/reffferals.png";
import { toast } from "../lib";

export default function ReferralsPage() {
  const getReferral = () => {
    settings.getReferral().then((res) => {
      navigator.clipboard.writeText(res.data.referral_link);
      toast("Referral link copied");
    });
  };
  return (
    <div className="flex flex-col items-center h-full">
      <div className="mt-16 flex flex-col items-center">
        <img src={refferals} />
        <div className="mt-4 text-4xl font-bold text-center leading-10">
          Invite friends. Earn points.
        </div>
      </div>
      <div className="mt-12 self-start">
        <div className="text-lg font-bold">How it works</div>
        <div className="flex mt-6">
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
      <div
        onClick={getReferral}
        className="mt-auto mb-5 text-center p-3 w-full rounded-md bg-white text-black"
      >
        Invite friends (5 left)
      </div>
    </div>
  );
}
