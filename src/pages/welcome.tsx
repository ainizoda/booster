import { useNavigate } from "react-router";

import { Button } from "../components";
import boosterLogo from "../assets/booster.svg";
import { authenticate } from "../api";
import { useWebAppData } from "../contexts";

export default function WelcomePage() {
  const navigate = useNavigate();
  const data = useWebAppData();

  const register = () => {
    const creds = {
      id: data.user?.id?.toString() || "5899795697",
      hash:
        data.hash ||
        "b09b8b42aea974f33357400e73f8470a12bfd854e01137b663fafa37250bf1ea",
    };

    // if (!data.user?.id || !data.hash) {
    // }

    authenticate(creds).then((res: any) => {
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

      navigate("/register");
    });
  };

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
