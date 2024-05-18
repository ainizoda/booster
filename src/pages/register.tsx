import { Button } from "../components/ui/button";
import { Avatar } from "../components/avatar";
import { Input } from "../components/ui/input";

export default function RegisterPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mt-12 w-full">
        <div className="text-3xl text-center font-bold">
          Boom!
          <br />
          Welcome to the Crew
        </div>
        <div className="mt-10 flex justify-center">
          <Avatar />
        </div>
        <div className="mt-12 mb-14 leading-8 text-[#ffffffd8]">
          <div>&nbsp;Nickname</div>
          <Input placeholder="choose your nickname" />
        </div>
      </div>
      <Button className="mt-auto mb-6">Continue</Button>
    </div>
  );
}
