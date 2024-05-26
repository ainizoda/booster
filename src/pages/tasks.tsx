import { useEffect, useState } from "react";
import classNames from "classnames";
import boosterLogo from "../assets/booster.svg";
import { missions } from "../api/tasks";
import { ArrowRight, EnergyOutlined, WalletSetup } from "../components";
import { useSearchParams } from "react-router-dom";
import { toast } from "../lib";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTasks = () => {
    setLoading(true);
    missions.getAll().then((res) => {
      setTasks(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const [params, setParams] = useSearchParams();

  const completeTask = (task: any) => {
    if (task.tag === "wallet_setup") {
      setParams({ option: "wallet_setup" });
      return;
    }
    if (task.tag === "share_email") {
      return;
    }
    if (task.tag === "play_crash") {
      return;
    }
    window.location.href = task.description;
    // missions.collect({ mission_id: task.id });
  };

  const claimWalletSetup = () => {
    toast("task completed");
    setParams({});
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="mt-16 flex flex-col items-center">
        <img src={boosterLogo} width={54} height={68} />
        {loading ? (
          <div className="animate-pulse mt-4">
            <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-48"></div>
          </div>
        ) : (
          <div className="text-2xl text-center mt-4">
            {params.get("option") === "wallet_setup"
              ? "Share your wallet"
              : tasks.length + " tasks available"}
          </div>
        )}
      </div>
      <div className="leading-7 text-[#A6A6A6] mt-3 text-lg">
        Where every tap turns into treasure. Ready to make your mark and bloom
        with us? Let’s go!
      </div>
      {params.get("option") === "wallet_setup" ? (
        <WalletSetup claim={claimWalletSetup} />
      ) : (
        <div className="mt-7 w-full">
          {loading ? (
            <div>
              <div className="animate-pulse mt-4">
                <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
              </div>
              <div className="animate-pulse mt-4">
                <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
              </div>
              <div className="animate-pulse mt-4">
                <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
              </div>
              <div className="animate-pulse mt-4">
                <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
              </div>
              <div className="animate-pulse mt-4">
                <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
              </div>
              <div className="animate-pulse mt-4">
                <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
              </div>
              <div className="animate-pulse mt-4">
                <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
              </div>
              <div className="animate-pulse mt-4">
                <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full"></div>
              </div>
            </div>
          ) : (
            tasks.map((task: any) => (
              <div
                key={task?.id}
                onClick={() => completeTask(task)}
                className="border border-[#9945FF] flex justify-between p-4 items-center rounded-md mb-3"
              >
                <div className="flex items-center">
                  <div className="w-16 font-orbitron text-xl flex items-center">
                    <div className="pr-2">{task?.reward}</div>
                    <EnergyOutlined />
                  </div>
                  <div className="text-sm pl-3">{task?.title}</div>
                </div>
                {task?.mission_completed ? (
                  <div
                    className={classNames(
                      "bg-[#0D8345] text-sm rounded px-3 py-1"
                    )}
                  >
                    Claim
                  </div>
                ) : (
                  <ArrowRight />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
