import { useEffect, useState, useRef, MutableRefObject } from "react";
import { useNavigate } from "react-router";
import useWebSocket from "react-use-websocket";
import classNames from "classnames";
import {
  Avatar,
  BetResultIcon,
  Button,
  CopyIcon,
  Energy,
  Input,
  Modal,
  RectIcon,
  ShieldIcon,
  Tag,
  UsersIcon,
} from "../components";
import { Bet, Game, LastGameResults, apiURL, crash, farming } from "../api";
import { toast } from "../lib";
// import bettinUserImg from "../assets/betting_user.png";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

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

    setGameStarted(false);
    setBetPlaced(false);
    setCashedOut(false);
    setCashout({});
    setLiveRatio("1.00");
    fetchGameTiming();
    getBets();
    updateBalance();
    getLastGameResults();
    getGames();
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
  const [games, setGames] = useState<Game[] | null>(null);

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
  const getGames = () => {
    crash.getGames(10).then((res) => setGames(res.data));
  };

  useEffect(() => {
    getBets();
    updateBalance();
    getLastGameResults();
    getGames();
  }, []);
  // console.log(games)
  const copy = (hash?: string) => {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    toast("Hash copied successfully", { icon: <CopyIcon /> });
  };

  const navigate = useNavigate();

  const getTagColor = (ratio: number) => {
    if (ratio < 1.4) return "black";
    if (ratio < 4) return "blue";
    if (ratio < 7) return "pink";
    return "green";
  };

  const showGameInfo = (game: Game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game>();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Modal
        title={`Round #${selectedGame?.id}`}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <div>
          Hash:{" "}
          <span
            className="text-xs break-words text-slate-400 hover:text-slate-300 cursor-pointer"
            onClick={() => copy(selectedGame?.game_hash)}
          >
            {selectedGame?.game_hash}
          </span>
        </div>
        <div className="mt-5">
          {selectedGame?.bets.length === 0 && <div className="text-center text-sm text-slate-200 py-4">No bets found in this round</div>}
          {selectedGame?.bets?.map((bet) => (
            <div
              key={bet.user_id}
              className="flex justify-between bg-[#1929353c] px-4 py-2 rounded-md mb-1"
            >
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

                {bet?.result === "win" ? (
                  <div className="bg-[#7fca5d24] text-[#66D08A] text-xs rounded-md px-4 py-2 w-16 text-center">
                    x{bet.cash_out_multiplier}
                  </div>
                ) : (
                  <div className="bg-[#ca5d5d24] text-[#d06666] text-xs rounded-md px-4 py-2 w-16 text-center">
                    lose
                  </div>
                )}
                {bet.result === "win" ? (
                  <div className="flex items-center py-2 text-xs text-[#81E478] w-16">
                    <Energy size={16} color="#81E478" />
                    <div className="pr-1">
                      {(bet.cash_out_multiplier * bet.amount).toFixed(2)}
                    </div>
                    <BetResultIcon />
                  </div>
                ) : (
                  <div className="flex items-center py-2 text-xs text-[#d06666] w-16">
                    <Energy size={16} color=" #d06666" />
                    <div className="pr-1">
                      -{(bet.cash_out_multiplier * bet.amount).toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal>
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
        {games ? (
          <Swiper
            slidesPerView={6.8}
            fadeEffect={{ crossFade: true }}
            spaceBetween={4}
          >
            {games.map((game) => (
              <SwiperSlide
                key={game.id}
                onClick={() => {
                  showGameInfo(game);
                }}
              >
                <Tag
                  value={game.result.toFixed(2)}
                  color={getTagColor(game.result)}
                />
              </SwiperSlide>
            ))}
            {/* <div className="bg-[#3E497D] w-20 rounded-md flex items-center justify-center gap-1 text-[10px]">
              <HistoryIcon />
              History
            </div> */}
          </Swiper>
        ) : (
          <div className="animate-pulse flex gap-1">
            <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-12"></div>
            <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-12"></div>
            <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-12"></div>
            <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-12"></div>
            <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-12"></div>
            <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-12"></div>
            <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-12"></div>
          </div>
        )}
      </div>
      <div className="bg-[#66d08911] text-[#66D08A] text-[10px] flex items-center justify-between w-full px-4 py-2 mt-2 rounded-md">
        <div className="flex gap-2 items-center">
          <ShieldIcon />
          <div>ROUND</div>
          <div>#5144409</div>
        </div>
        <div className="flex gap-2" onClick={() => copy(lastGame?.hash)}>
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
          <div
            key={bet.user_id}
            className="flex justify-between bg-[#253c4e3c] px-4 py-2 rounded-md mb-1"
          >
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
