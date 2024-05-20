import { useNavigate } from "react-router";

import { Button } from "../components";
import boosterLogo from "../assets/booster.svg";
import { authenticate } from "../api";
import { useWebAppData } from "../contexts";

export default function WelcomePage() {
  const navigate = useNavigate();
  const data = useWebAppData() as any;

  const register = () => {
    if (!data.user?.id) {
      return;
    }
    alert(
      JSON.stringify({
        id: data.user?.id?.toString(),
        hash: data.hash,
        first_name: data.user?.first_name,
        last_name: data.user?.last_name,
        username: data.user?.username,
        photo_url: data.user?.photo_url,
        auth_date: data.auth_date?.toString(),
      })
    );
    authenticate({
      id: data.user?.id?.toString(),
      hash: data.hash,
      first_name: data.user?.first_name,
      last_name: data.user?.last_name,
      username: data.user?.username,
      photo_url: data.user?.photo_url,
      auth_date: data.auth_date?.toString(),
    }).then((res: any) => {
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
