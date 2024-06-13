import { useEffect, useState, useRef, MutableRefObject } from "react";
import useWebSocket from "react-use-websocket";
import {
  Avatar,
  BetResultIcon,
  Button,
  CopyIcon,
  Energy,
  HistoryIcon,
  Input,
  RectIcon,
  ShieldIcon,
  Tag,
  UsersIcon,
} from "../components";
import { Bet, LastGameResults, apiURL, crash, farming } from "../api";
import { toast } from "../lib";
// import bettinUserImg from "../assets/betting_user.png";
import classNames from "classnames";
import { useNavigate } from "react-router";

export default function CrashPage() {
  const { lastJsonMessage } = useWebSocket<{
    type: string;
    final_ratio: string;
  }>(`${apiURL}/crash/ws`, {
    onOpen: () => console.log("opened"),
    shouldReconnect: () => true,
  });
  const { lastJsonMessage: gameProcess } = useWebSocket<{
    bet?: string;
    cashout_multiplier?: string;
    user: string;
  }>(`${apiURL}/crash/listen-for-bets`, {
    onOpen: () => console.log("bets opened"),
    shouldReconnect: () => true,
  });

  const [liveRatio, setLiveRatio] = useState<string>("1.00");
  const [countdown, setCountdown] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const calculateInitialRatioAndInterval = (elapsedTime: number) => {
    const initialTime = 200; // Initial time increment in milliseconds
    const timeDecreaseFactor = 0.995; // Time decrease factor
    let currentTime = initialTime;
    let multiplier = 1.0;

    while (elapsedTime > 0) {
      elapsedTime -= currentTime;
      if (elapsedTime > 0) {
        multiplier += 0.01;
      }
      currentTime *= timeDecreaseFactor;
    }

    return { multiplier, currentTime };
  };

  const updateLiveRatio = (
    currentTimeRef: MutableRefObject<number>,
    timeDecreaseFactorRef: MutableRefObject<number>
  ) => {
    setLiveRatio((prev) => {
      const newMultiplier = parseFloat((+prev + 0.01).toFixed(2));
      return newMultiplier.toString();
    });
    currentTimeRef.current *= timeDecreaseFactorRef.current;
    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(
      () => updateLiveRatio(currentTimeRef, timeDecreaseFactorRef),
      currentTimeRef.current
    );
  };

  const startGame = (initialRatio: number, initialInterval: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setLiveRatio(initialRatio.toFixed(2).toString());
    setCountdown(null);

    const currentTimeRef = { current: initialInterval };
    const timeDecreaseFactorRef = { current: 0.995 };

    intervalRef.current = setInterval(
      () => updateLiveRatio(currentTimeRef, timeDecreaseFactorRef),
      currentTimeRef.current
    );
  };

  const stopGame = (finalRatio: string) => {
    if (intervalRef.current) {
      setLiveRatio((+finalRatio).toFixed(2));
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    fetchGameTiming();
  };

  const fetchGameTiming = async () => {
    try {
      const response = await crash.getGameTiming();

      const { current_time, betting_close_time } = response.data;
      const currentTime = new Date(current_time).getTime();
      const bettingCloseTime = new Date(betting_close_time).getTime();
      const elapsedTime = currentTime - bettingCloseTime;
      const timeoutDuration = bettingCloseTime - currentTime;

      if (timeoutDuration > 0) {
        setCountdown(Math.floor(timeoutDuration / 1000));

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
        }

        countdownIntervalRef.current = setInterval(() => {
          setCountdown((prev) => (prev !== null ? prev - 1 : null));
        }, 1000);

        timeoutRef.current = setTimeout(() => {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
          }
          startGame(1, 200);
        }, timeoutDuration);
      } else {
        const { multiplier, currentTime: initialInterval } =
          calculateInitialRatioAndInterval(elapsedTime);

        startGame(multiplier, initialInterval);
      }
    } catch (error) {
      console.error("Error fetching game timing:", error);
    }
  };

  useEffect(() => {
    fetchGameTiming();

    if (lastJsonMessage?.type === "start") {
      startGame(1, 200);
      setGameStarted(true);
    } else if (lastJsonMessage?.type === "end") {
      stopGame(lastJsonMessage?.final_ratio);
      setGameStarted(false);
      setBetPlaced(false);
      setCashedOut(false);
      setCashout({});
      setLiveRatio("1.00");
      getBets();
      updateBalance();
      getLastGameResults();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [lastJsonMessage]);

  useEffect(() => {
    if (gameProcess?.bet !== undefined) {
      getBets();
      return;
    }
    setCashout((prev) => ({
      ...prev,
      [gameProcess?.user]: gameProcess?.cashout_multiplier,
    }));
  }, [gameProcess]);

  const [betAmount, setBetAmount] = useState("");
  const [betPlaced, setBetPlaced] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const placeBet = () => {
    if (gameStarted && !betPlaced) {
      toast("Wait for the next game to bet", { error: true });
      return;
    }
    if (!betAmount) {
      toast("Enter amount of coins you want to bet", { error: true });
      return;
    }
    if (betPlaced) {
      if (!gameStarted) {
        cancelBet();
        return;
      }
      if (cashedOut) {
        return;
      }
      crash.cashout(parseFloat(liveRatio)).then((res) => {
        toast(res.data?.detail);
        updateBalance();
      });

      setCashedOut(true);
      return;
    }
    crash.placeBet(parseFloat(betAmount)).then((res) => {
      getBets();
      if (res.status === 200) {
        setBetPlaced(true);
        toast(res.data?.detail);
        updateBalance();
      }
    });
  };

  const cancelBet = () => {
    crash.cancelBet().then((res) => {
      setBetPlaced(false);
      toast(res.data.detail);
      getBets();
    });
  };

  const [bets, setBets] = useState<Bet[]>();
  const [balance, setBalance] = useState();
  const [lastGame, setLastGame] = useState<LastGameResults>();
  const [cashout, setCashout] = useState({});

  const getBets = () => {
    crash.getBets().then((res) => {
      setBets(res.data);
    });
  };

  const updateBalance = () => {
    farming.getBalance().then((res) => setBalance(res.data?.balance));
  };

  const getLastGameResults = () => {
    crash.getLastGameResults().then((res) => setLastGame(res.data));
  };

  useEffect(() => {
    getBets();
    updateBalance();
    getLastGameResults();
  }, []);

  const copyHash = () => {
    if (lastGame?.hash) {
      navigator.clipboard.writeText(lastGame?.hash);
      toast("Hash copied successfully", { icon: <CopyIcon /> });
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="bgpic h-72 w-full">
        <div className="flex justify-between pt-12 px-2">
          <div>
            <div className="text-3xl">
              {countdown !== null ? `${countdown}s` : `x${liveRatio}`}
            </div>
            <div className="text-gray-500 text-sm">
              {countdown !== null ? "STARTS IN" : "CRASH"}
            </div>
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <RectIcon />
              <div className="flex items-center">
                <div>
                  <Energy size={20} />
                </div>
                {balance ? (
                  <div>{balance}</div>
                ) : (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-16"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 items-center mt-1">
              <UsersIcon />
              {bets ? (
                <div>{bets?.length}</div>
              ) : (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-16"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-1 py-3 mt-3">
        <Tag color="blue" value="1.53x" />
        <Tag color="black" value="1x" />
        <Tag color="pink" value="4.37x" />
        <Tag color="pink" value="3.15x" />
        <Tag color="blue" value="1.21x" />
        <Tag color="green" value="7.31x" />
        <div className="bg-[#3E497D] w-20 rounded-md flex items-center justify-center gap-1 text-[10px]">
          <HistoryIcon />
          History
        </div>
      </div>
      <div className="bg-[#66d08911] text-[#66D08A] text-[10px] flex items-center justify-between w-full px-4 py-2 mt-2 rounded-md">
        <div className="flex gap-2 items-center">
          <ShieldIcon />
          <div>ROUND</div>
          <div>#5144409</div>
        </div>
        <div className="flex gap-2" onClick={copyHash}>
          <div>
            {lastGame?.hash.slice(0, 5)} ...{" "}
            {lastGame?.hash.slice(
              lastGame?.hash.length - 5,
              lastGame?.hash.length
            )}
          </div>
          <CopyIcon />
        </div>
      </div>
      <div className="mt-4 text-[#4E5D8D]">
        <div>Enter amount</div>
        <div className="flex w-full mt-1 gap-1">
          <Input
            startIcon={<Energy size={22} color="#CDDBFF" />}
            className="bg-transparent border-[0.5px] border-slate-600 !py-0"
            placeholder="bet amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            type="number"
            disabled={gameStarted}
          />
          <Button
            onClick={placeBet}
            className={classNames("!w-[200px] text-white !py-2", {
              "!bg-[#9945FF]": !betPlaced,
              "!bg-[#ff4551]": betPlaced,
              "!bg-[#2db030]": betPlaced && gameStarted,
              "!bg-[#424242]": betPlaced && gameStarted && cashedOut,
            })}
          >
            {betPlaced ? (!gameStarted ? "Cancel" : "Cashout") : "Start"}
          </Button>
        </div>
      </div>
      <div className="mt-4 h-[35vh] overflow-auto">
        {bets?.map((bet) => (
          <div className="flex justify-between bg-[#253c4e3c] px-4 py-2 rounded-md mb-1">
            <div className="flex gap-2 items-center">
              <Avatar
                className="w-5 h-5 text-xs rounded-sm"
                name={bet?.username}
              />
              <div className="text-xs text-[#94A8C8]">{bet.username}</div>
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center">
                <Energy size={16} />
                <div className="text-xs">{bet.amount}</div>
              </div>
              <div className="bg-[#7fca5d24] text-[#66D08A] text-xs rounded-md px-4 py-2 w-16 text-center">
                x{cashout[bet.username as keyof typeof cashout] || liveRatio}
              </div>
              <div className="flex items-center py-2 text-xs text-[#81E478] w-16">
                <Energy size={16} color="#81E478" />
                <div className="pr-1">
                  {(
                    parseFloat(
                      cashout[bet.username as keyof typeof cashout] || liveRatio
                    ) * bet.amount
                  ).toFixed(2)}
                </div>
                <BetResultIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full py-3 px-4 bg-black">
        <div
          className="text-center border border-white rounded-md p-3 text-lg"
          onClick={() => navigate("/home")}
        >
          Back
        </div>
      </div>
    </div>
  );
}
