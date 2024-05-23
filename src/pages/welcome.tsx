import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Button, Loader } from "../components";
import boosterLogo from "../assets/booster.svg";
import { authenticate } from "../api";

const initDataMock =
  "user=%7B%22id%22%3A5899795697%2C%22first_name%22%3A%22Bob%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22akaibob%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2669375549145693865&chat_type=group&auth_date=1716205328&hash=e040ff7a44dd7d8ee8d0507fc28afc84403eac6e05a6488bba9baeff856edd30";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const register = () => {
    setLoading(true);
    authenticate({
      data_check_string: Telegram.WebApp.initData || initDataMock,
    }).then((res: any) => {
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      navigate("/register");
      setLoading(false);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/home");
    }
  }, []);

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
