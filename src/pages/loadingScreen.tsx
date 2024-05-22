import { FC, useEffect, useRef, useState } from "react";

import { CheckMarkIcon } from "../components";
import plant from "../assets/plant.png";
import fire from "../assets/fire.png";
import diamond from "../assets/diamond.png";
import { useNavigate } from "react-router";

const ProgressItem: FC<{
  image?: string;
  label: string;
  start: boolean;
  onFinish?: () => void;
}> = ({ label, image, start, onFinish }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      setPercent((prev) => {
        const newState = Math.min(prev + Math.floor(Math.random() * 15), 100);
        if (progressRef.current) {
          progressRef.current.style.width = newState + "%";
        }
        if (newState >= 100) {
          clearInterval(interval);
          onFinish?.();
        }
        return newState;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [start, onFinish]);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <img src={image} alt={label} />
          <span>{label}</span>
        </div>
        <div>{percent === 100 ? <CheckMarkIcon /> : percent + "%"}</div>
      </div>
      {percent < 100 && (
        <div className="mt-5">
          <div className="bg-white w-full h-2 rounded-sm">
            <div
              className="bg-[#9945FF] h-2 rounded-sm transition-all"
              style={{ width: `${percent}%` }}
              ref={progressRef}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function LoadingScreenPage() {
  const [bars, setBars] = useState({
    points: true,
    bonuses: false,
    rewards: false,
  });
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="mt-12 w-full">
        <div className="text-3xl text-center font-bold">
          We are crafting your experience
        </div>
        <div className="mx-3 mt-24 text-white text-xl">
          <ProgressItem
            image={plant}
            label="Planting points"
            start={bars.points}
            onFinish={() => {
              setBars((prev) => ({ ...prev, points: false, bonuses: true }));
              console.log("Points finished");
            }}
          />
          <ProgressItem
            image={fire}
            label="Boosting bonuses"
            start={bars.bonuses}
            onFinish={() =>
              setBars((prev) => ({ ...prev, bonuses: false, rewards: true }))
            }
          />
          <ProgressItem
            image={diamond}
            label="Harvesting rewards"
            start={bars.rewards}
            onFinish={() => {
              navigate("/home");
            }}
          />
        </div>
      </div>
    </div>
  );
}
