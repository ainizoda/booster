import { Avatar } from "../components";
import { useWebAppData } from "../contexts";
import energyIcon from "../assets/energy.svg";
import crashIcon from "../assets/crach_icon.svg";

export default function HomePage() {
  const data = useWebAppData();
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
          <img src={energyIcon} alt="energy" />
        </div>
        <div className="font-orbitron text-6xl font-bold">0.000</div>
      </div>
      <div className="w-full flex flex-col items-center py-4 bg-[#9945FF] rounded-md mt-20 hover:brightness-125 transition-all">
        <img src={crashIcon} alt="crash icon" />
        <div className="mt-2 text-xl">Play Crash</div>
      </div>
      <div className="mt-auto text-center py-3 w-full bg-white rounded-md text-black hover:brightness-75 transition-all">
        Start farming
      </div>
    </div>
  );
}
