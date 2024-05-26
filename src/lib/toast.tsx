import hotToast from "react-hot-toast";
import { ToastCheckMark } from "../components";

export const toast = (message: string) =>
  hotToast(message, {
    icon: <ToastCheckMark />,
    style: {
      borderRadius: "8px",
      background: "#282828",
      color: "#fff",
    },
  });
