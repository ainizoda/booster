import { FC, useState } from "react";
import { Input } from "./ui";
import cls from "classnames";
import { CheckMarkIcon, ErrorIcon } from "./icons";

export const WalletSetup: FC<{ claim: () => void }> = ({ claim }) => {
  const [address, setAddress] = useState<string>("");

  const getInputIcon = () => {
    // if (loading) return <SpinnerSM />;
    // if (!data) return;
    // if (data.available) {
    //   return <CheckMarkIcon />;
    // }
    // return <ErrorIcon />;
    if (address.length) {
      return <CheckMarkIcon />;
    }
    return <ErrorIcon />;
  };
  return (
    <>
      <div className="self-start mt-16 w-full">
        <div className="mb-2">&nbsp;Wallet address</div>
        <Input
          placeholder="choose your nickname"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          className={cls({
            "border border-1": address.length > 0,
            ...(address && {
              "border-red-500": !address.length,
              "border-green-500": address.length,
            }),
          })}
          icon={getInputIcon()}
        />
        <small
          className={cls({
            "text-red-500": !address.length,
            "text-green-500": address.length,
          })}
        >
          &nbsp;Address is saved!
        </small>
      </div>
      <div
        className={cls("mt-auto mb-5 text-center p-3 w-full rounded-md", {
          "bg-[#0D8345] text-[#fff]": address.length,
          "bg-[#1C1C1E] text-[#A6A6A6]": !address.length,
        })}
        onClick={claim}
      >
        Claim
      </div>
    </>
  );
};
