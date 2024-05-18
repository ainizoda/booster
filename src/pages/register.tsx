import { Button } from "../components/ui/button";
import { Avatar } from "../components/ui/avatar";
import { useWebAppData } from "../contexts";
import { useMemo } from "react";
import { Input } from "../components/ui/input";

export default function RegisterPage() {
  const { user } = useWebAppData();
  const shortName = useMemo(
    () => (user?.first_name[0] || "") + (user?.last_name?.[0] || ""),
    [user]
  );
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mt-24 w-full">
        <div className="text-3xl text-center">
          Boom!
          <br />
          Welcome to the Crew
        </div>
        <div className="mt-10 flex justify-center">
          <Avatar name={shortName || "B"} />
        </div>
        <div className="mt-12 mb-12 leading-8 text-[#ffffffd8]">
          <div>&nbsp;Nickname</div>
          <Input placeholder="choose your nickname" />
        </div>
      </div>
      <Button className="mt-auto mb-6">Continue</Button>
    </div>
  );
}
