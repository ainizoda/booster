import { ChangeEvent, useState } from "react";
import cls from "classnames";

import { ICheckNickname, checkNickname } from "../api";
import { Button } from "../components";
import { Avatar } from "../components";
import { Input } from "../components";
import { useDebounce } from "../hooks/useDebounce";
import { useWebAppData } from "../contexts";

export default function RegisterPage() {
  const initData = useWebAppData();
  const checkUsername = useDebounce(checkNickname, 300);
  const [data, setData] = useState<ICheckNickname>();
  const [username, setUsername] = useState(initData.user?.usernames || "");

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    checkUsername(e.target.value).then((res) => {
      setData(res);
    });
  };

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
          <Input
            placeholder="choose your nickname"
            onChange={onUsernameChange}
            value={username}
          />
          <small
            className={cls({
              "text-red-500": !data?.available,
              "text-green-500": data?.available,
            })}
          >
            &nbsp;{data?.message}
          </small>
        </div>
      </div>
      <Button className="mt-auto mb-6">Continue</Button>
    </div>
  );
}
