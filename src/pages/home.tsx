import { useEffect, useState } from "react";
import cls from "classnames";

import { farming, settings } from "../api";
import { Avatar, CrashIcon, EnergyIcon, EnergyXSIcon } from "../components";
import { useWebAppData } from "../contexts";
import { SpinnerSM } from "../components/icons/utils";
import { toast } from "../lib";
import { useNavigate } from "react-router";

export default function HomePage() {
  const data = useWebAppData() as any;

  const [status, setStatus] = useState<any>();
  const [balance, setBalance] = useState<string>("");
  const [loading, setLoading] = useState({
    farming: false,
    balance: false,
  });
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [earnedReward, setEarnedReward] = useState(0);

  const getStatus = () => {
    setLoading((prev) => ({ ...prev, farming: true, balance: true }));

    farming
      .getStatus()
      .then((res) => {
        setStatus(res.data);
        setEarnedReward(res.data?.earned_reward);
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, farming: false }));
      });

    farming
      .getBalance()
      .then((res) => {
        setBalance(res?.data?.balance);
      })
      .finally(() => setLoading((prev) => ({ ...prev, balance: false })));
  };

  const action = () => {
    if (status?.time_left === undefined) {
      return farming.start().then(() => {
        getStatus();
      });
    }
    if (status?.collectable) {
      return farming.claimReward().then(() => {
        toast("You got +57.00 Booster Points");
        getStatus();
      });
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    if (status?.time_left === undefined || status?.collectable) return;

    const interval = setInterval(() => {
      setEarnedReward((prev) => prev + 57 / (8 * 3600));
      setStatus((prev: any) => {
        if (prev?.time_left > 0) {
          return {
            ...prev,
            time_left: prev.time_left - 1,
          };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status?.time_left !== undefined) {
      setTimeLeft(formatTime(status.time_left));
    }
  }, [status?.time_left]);

  useEffect(() => {
    if (data?.start_param) {
      settings.putReferral(data.start_param);
    }
  }, [data]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const buttonClassName = "mt-auto mb-5 text-center p-3 w-full rounded-md";
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-full">
      <div className="mt-12 flex flex-col items-center">
        <Avatar className="!w-24 !h-24 !text-[40px]" />
        <div className="text-2xl text-center mt-4">{data?.user?.username}</div>
      </div>
      {!loading.balance ? (
        <div className="flex mt-9 text-ellipsis items-center">
          <div className="pr-4">
            <EnergyIcon />
          </div>
          <div
            className={cls("font-orbitron font-bold text-ellipsis", {
              "text-5xl": Number(balance?.length) < 8,
              "text-4xl": Number(balance?.length) === 8,
              "text-3xl": Number(balance?.length) > 8,
            })}
          >
            {balance}
          </div>
        </div>
      ) : (
        <div className="animate-pulse mt-9">
          <div className="h-16 bg-gray-200 rounded-md dark:bg-gray-700 w-64"></div>
        </div>
      )}
      <div
        onClick={() => navigate("/crash")}
        className="w-full flex flex-col items-center py-2 bg-[#9945FF] rounded-lg mt-[5vh] hover:brightness-125 transition-all"
      >
        <CrashIcon />
        <div className="mt-2 text-xl">Play Crash</div>
      </div>
      <div
        onClick={action}
        className={cls(buttonClassName, {
          "flex relative justify-center gap-3":
            loading.farming || status?.time_left !== undefined,
          "bg-[#5E5E5E] ": !status?.collectable || loading.farming,
          "text-[#9A9A9A]":
            (loading.farming || status?.time_left !== undefined) &&
            !status?.collectable,
          "bg-white text-black hover:brightness-75 transition-all":
            status?.time_left === undefined && !loading.farming,
          "bg-[#0D8345]": status?.collectable,
        })}
      >
        {loading.farming ? (
          <SpinnerSM />
        ) : status?.time_left !== undefined ? (
          <>
            {status?.collectable ? "Claim" : "Farming"}
            <div className="flex gap-1 items-center">
              <EnergyXSIcon />
              <span>{earnedReward.toFixed(3)}</span>
            </div>
            {!status?.collectable && (
              <div className="absolute right-3">{timeLeft}</div>
            )}
          </>
        ) : (
          "Start farming"
        )}
      </div>
    </div>
  );
}
