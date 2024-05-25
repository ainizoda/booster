import { useEffect, useState } from "react";
import cls from "classnames";

import { farming } from "../api";
import { Avatar, CrashIcon, EnergyIcon, EnergyXSIcon } from "../components";
import { useWebAppData } from "../contexts";
import spinnersm from "../assets/spinnersm.svg";

export default function HomePage() {
  const data = useWebAppData() as any;

  const [status, setStatus] = useState<any>();
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
        console.log(res.data);
      })
      .finally(() => setLoading((prev) => ({ ...prev, balance: false })));
  };

  const action = () => {
    if (status?.time_left === undefined) {
      return farming.start();
    }
    if (status?.collactable) {
      return farming.collectReward();
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    if (status?.time_left === undefined) return;

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

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const buttonClassName = "mt-auto mb-3 text-center p-3 w-full rounded-md";

  return (
    <div className="flex flex-col items-center h-full">
      <div className="mt-16 flex flex-col items-center">
        <Avatar />
        <div className="text-2xl text-center mt-4">
          {data?.user?.username || "didenkouniversal"}
        </div>
      </div>
      <div className="flex mt-9">
        <div className="pr-4">
          <EnergyIcon />
        </div>
        <div className="font-orbitron text-6xl font-bold">0.000</div>
      </div>
      <div className="w-full flex flex-col items-center py-4 bg-[#9945FF] rounded-md mt-20 hover:brightness-125 transition-all">
        <CrashIcon />
        <div className="mt-2 text-xl">Play Crash</div>
      </div>
      <div
        onClick={action}
        className={cls(buttonClassName, {
          "flex relative bg-[#5E5E5E] justify-center gap-3":
            loading.farming || status?.time_left !== undefined,
          "text-[#9A9A9A]":
            (loading.farming || status?.time_left !== undefined) &&
            !status?.collactable,
          "bg-white text-black hover:brightness-75 transition-all":
            status?.time_left === undefined,
          "bg-[#0D8345]": status?.collactable,
        })}
      >
        {loading.farming ? (
          <img src={spinnersm} />
        ) : status?.time_left !== undefined ? (
          <>
            {status?.collactable ? "Claim" : "Farming"}
            <div className="flex gap-1 items-center">
              <EnergyXSIcon />
              <span>{earnedReward.toFixed(3)}</span>
            </div>
            {!status?.collactable && (
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
