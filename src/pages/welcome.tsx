import { useState } from "react";
import { useNavigate } from "react-router";

import { Button, Loader } from "../components";
import boosterLogo from "../assets/booster.svg";
import { auth } from "../api";
import { useWebAppInitData } from "../contexts";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initData = useWebAppInitData();
  const register = () => {
    setLoading(true);
    auth
      .login({
        data_check_string: initData,
      })
      .then(() => {
        navigate("/register");
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen flex-wrap">
      <div className="mt-auto text-center">
        <div className="flex justify-center">
          <img src={boosterLogo} alt="logo" />
        </div>
        <div className="text-3xl mt-10 font-bold">Welcome to Booster</div>
        <div className="mt-5 leading-7 text-[#ffffffd8]">
          Where every tap turns into treasure. Ready to make your mark and bloom
          with us? Let’s go!
        </div>
      </div>
      <Button onClick={register} className="mt-auto mb-6">
        Create account
      </Button>
    </div>
  );
}
