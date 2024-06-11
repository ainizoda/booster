import { ChangeEvent, FC, useMemo, useState } from "react";
import { Input } from "./ui";
import cls from "classnames";
import { CheckMarkIcon, ErrorIcon } from "./icons";
import { settings } from "../api";

export const ShareEmail: FC<{ claim: () => void }> = ({ claim }) => {
  const [address, setAddress] = useState<string>("");
  const isAddressValid = useMemo(
    () =>
      String(address)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
    [address]
  );

  const getInputIcon = () => {
    // if (loading) return <SpinnerSM />;
    // if (!data) return;
    // if (data.available) {
    //   return <CheckMarkIcon />;
    // }
    // return <ErrorIcon />;
    if (!address.length) return;
    if (isAddressValid) {
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
        <div className="mb-2">&nbsp;Email</div>
        <Input
          placeholder="your email"
          onChange={handleAddressChange}
          value={address}
          className={cls({
            "border border-1": true,
            ...(address && {
              "border-red-500": !isAddressValid,
              "border-green-500": isAddressValid,
            }),
          })}
          icon={getInputIcon()}
        />
        {isAddressValid && (
          <small
            className={cls({
              "text-green-500": isAddressValid,
            })}
          >
            &nbsp;Email is saved!
          </small>
        )}
      </div>
      <div
        className={cls("fixed bottom-20 w-[90%] text-center p-3 rounded-md", {
          "bg-[#0D8345] text-[#fff]": isAddressValid,
          "bg-[#1C1C1E] text-[#A6A6A6]": !isAddressValid,
        })}
        onClick={
          isAddressValid
            ? () => {
                settings.shareEmail(address).then((res) => {
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
