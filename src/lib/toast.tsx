import hotToast, { ToastOptions } from "react-hot-toast";
import { ToastCheckMark } from "../components";

export const toast = (
  message: string,
  options?: ToastOptions & { error?: boolean }
) => {
  const opts = {
    style: {
      borderRadius: "8px",
      background: "#282828",
      color: "#fff",
      ...options?.style,
    },
    ...options,
  };

  hotToast.dismiss();

  if (options?.error) {
    return hotToast.error(message, opts);
  }

  return hotToast(message, {
    icon: <ToastCheckMark />,
    ...opts,
  });
};
