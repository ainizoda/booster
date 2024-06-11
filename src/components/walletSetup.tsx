import { ChangeEvent, FC, useState } from "react";
import { Input } from "./ui";
import cls from "classnames";
import { CheckMarkIcon, ErrorIcon } from "./icons";
import { settings } from "../api";

export const WalletSetup: FC<{ claim: () => void }> = ({ claim }) => {
  const [address, setAddress] = useState<string>("");

  const getInputIcon = () => {
    // if (loading) return <SpinnerSM />;
    // if (!data) return;
    // if (data.available) {
    //   return <CheckMarkIcon />;
    // }
    // return <ErrorIcon />;
    if (!address.length) return;
    if (address.length > 10) {
      return <CheckMarkIcon />;
    }
    return <ErrorIcon />;
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setAddress(value);
  };

  return (
    <>
      <div className="self-start mt-8 w-full">
        <div className="mb-2">&nbsp;Wallet address</div>
        <Input
          placeholder="your wallet"
          onChange={handleAddressChange}
          value={address}
          className={cls({
            "border border-1": true,
            ...(address && {
              "border-red-500": address.length <= 10,
              "border-green-500": address.length > 10,
            }),
          })}
          icon={getInputIcon()}
        />
        {address.length > 10 && (
          <small
            className={cls({
              "text-green-500": address.length,
            })}
          >
            &nbsp;Address is saved!
          </small>
        )}
      </div>
      <div
        className={cls(
          "fixed bottom-20 w-[90%] text-center p-3 rounded-md",
          {
            "bg-[#0D8345] text-[#fff]": address.length > 10,
            "bg-[#1C1C1E] text-[#A6A6A6]": address.length <= 10,
          }
        )}
        onClick={
          address.length > 10
            ? () => {
                settings.shareWallet(address).then((res) => {
                  if (res.status === 200) {
                    claim();
                  }
                });
              }
            : () => {}
        }
      >
        Claim
      </div>
    </>
  );
};
