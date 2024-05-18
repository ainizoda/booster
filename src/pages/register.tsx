import { Button } from "../components/ui/button";
import { Avatar } from "../components/ui/avatar";
import { useWebAppData } from "../contexts";
import { useMemo } from "react";

export default function RegisterPage() {
  const { user } = useWebAppData();
  const shortName = useMemo(
    () => (user?.first_name[0] || "") + (user?.last_name?.[0] || ""),
    [user]
  );
  return (
    <div className="flex flex-col justify-center items-center h-screen flex-wrap">
      <div className="mt-24 text-center">
        <div className="text-3xl">
          Boom!
          <br />
          Welcome to the Crew
        </div>
        <div className="mt-10 flex justify-center">
          <Avatar name={shortName} />
        </div>
        <div className="mt-5 leading-8 text-[#ffffffd8]">
          Where every tap turns into treasure. Ready to make your mark and bloom
          with us? Let’s go!
        </div>
      </div>
      <Button className="mt-auto mb-6">Continue</Button>
    </div>
  );
}
