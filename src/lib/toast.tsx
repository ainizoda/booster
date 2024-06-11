import hotToast, { ErrorIcon, ToastOptions } from "react-hot-toast";
import { ToastCheckMark } from "../components";

export const toast = (
  message: string,
  options?: ToastOptions & { error?: boolean }
) => {
  hotToast.dismiss();
  hotToast(message, {
    icon: options?.error ? <ErrorIcon /> : <ToastCheckMark />,
    style: {
      borderRadius: "8px",
      background: "#282828",
      color: "#fff",
      ...options?.style,
    },
    ...options,
  });
};
