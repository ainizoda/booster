import { useEffect, useState } from "react";
import boosterLogo from "../assets/booster.svg";
import { missions } from "../api/tasks";
import { EnergyOutlined } from "../components";
import classNames from "classnames";

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
            {tasks.length} tasks available
          </div>
        )}
      </div>
      <div className=" leading-7 text-[#A6A6A6] mt-3 text-lg">
        Where every tap turns into treasure. Ready to make your mark and bloom
        with us? Let’s go!
      </div>
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
              className="border border-[#9945FF] flex justify-between p-4 items-center rounded-md mb-3"
            >
              <div className="flex gap-5 items-center">
                <div className="font-orbitron text-xl flex items-center gap-2">
                  <div>{task?.reward}</div>
                  <EnergyOutlined />
                </div>
                <div className="text-sm">{task?.title}</div>
              </div>
              <div
                className={classNames(
                  "bg-[#0D8345] text-sm rounded px-3 py-1",
                  {
                    "bg-[#0D8345]": task?.mission_completed,
                    "bg-[#282828]": !task?.mission_completed,
                  }
                )}
              >
                {task?.mission_completed ? "Claim" : "Start"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
