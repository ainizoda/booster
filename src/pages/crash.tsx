import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import {
  CopyIcon,
  Energy,
  HistoryIcon,
  RectIcon,
  ShieldIcon,
  Tag,
  UsersIcon,
} from "../components";
import { apiURL } from "../api";

export default function CrashPage() {
  const { lastJsonMessage } = useWebSocket(`${apiURL}/crash/ws`, {
    onOpen: () => console.log("opened"),
    shouldReconnect: () => true,
  });

  useEffect(() => {
    console.log(lastJsonMessage);
  }, [lastJsonMessage]);

  return (
    <div className="flex flex-col">
      <div className="bgpic h-72 w-full">
        <div className="flex justify-between pt-12 px-2">
          <div>
            <div className="text-3xl">x25.42</div>
            <div className="text-gray-500 text-sm">CRASH</div>
          </div>
          <div>
            <div className="flex gap-1 items-center">
              <RectIcon />
              <div className="flex items-center">
                <div>
                  <Energy size={20} />
                </div>
                <div>432.38</div>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-1">
              <UsersIcon />
              <div>102</div>
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
        <div className="flex gap-2">
          <div>c3819d ... 2af590</div>
          <CopyIcon />
        </div>
      </div>
    </div>
  );
}
