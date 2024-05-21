import { ChangeEvent, useEffect, useState } from "react";
import cls from "classnames";

import { ICheckNickname, checkNickname, updateUsername } from "../api";
import { Button, CheckMarkIcon, ErrorIcon } from "../components";
import { Avatar } from "../components";
import { Input } from "../components";
import { useDebounce } from "../hooks/useDebounce";
import { useWebAppData } from "../contexts";
import smallSpinner from "../assets/spinnersm.svg";

export default function RegisterPage() {
  const initData = useWebAppData() as any;
  const checkUsername = useDebounce(checkNickname, 500);

  const [data, setData] = useState<ICheckNickname>();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>(
    initData.user?.username || ""
  );

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.trim());
  };

  useEffect(() => {
    if (username.length > 0) {
      setLoading(true);
      checkUsername(username).then((res) => {
        setLoading(false);
        setData(res as any);
      });
    }
    setData(undefined);
  }, [username]);

  const getInputIcon = () => {
    if (loading) return <img src={smallSpinner} alt="loading" />;
    if (!data) return;
    if (data.available) {
      return <CheckMarkIcon />;
    }
    return <ErrorIcon />;
  };
  const submitUsername = () => {
    updateUsername(username);
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
            className={cls({
              "border border-1": username.length > 0,
              ...(data && {
                "border-red-500": !data?.available,
                "border-green-500": data?.available,
              }),
            })}
            icon={getInputIcon()}
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
      <Button className="mt-auto mb-6" onClick={submitUsername}>
        Continue
      </Button>
    </div>
  );
}
