import { FC, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { HomeIcon, ReferralsIcon, TasksIcon } from "../icons";

export const Sidebar: FC = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const screenRef = useRef<HTMLDivElement | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const handleResize = () => {
      if (window.innerHeight !== windowHeight) {
        setKeyboardVisible(true);
      } else {
        setKeyboardVisible(false);
      }
      screenRef?.current?.scrollTo(0, 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="h-[90vh] overflow-hidden">
      <div className="h-full overflow-auto" ref={screenRef}>
        <Outlet />
      </div>
      {!keyboardVisible && (
        <div className="fixed bottom-0 left-0 w-full px-14 pt-2 pb-4 bg-black">
          <div className="w-full flex items-center justify-between">
            <div
              className="flex flex-col items-center"
              onClick={() => navigate("/home")}
            >
              <HomeIcon active={router.pathname.includes("/home")} />
              <small className="mt-1">Home</small>
            </div>
            <div
              className="flex flex-col items-center"
              onClick={() => navigate("/tasks")}
            >
              <TasksIcon active={router.pathname.includes("/tasks")} />
              <small className="mt-1">Tasks</small>
            </div>
            <div
              className="flex flex-col items-center"
              onClick={() => navigate("/referrals")}
            >
              <ReferralsIcon active={router.pathname.includes("/referrals")} />
              <small className="mt-1">Referrals</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
