import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import cls from "classnames";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  open?: boolean;
  onClose?: () => void;
};
export const Modal: FC<Props> = ({
  children,
  className,
  title,
  bodyClassName,
  onClose,
  open = false,
}) => {
  const handleClose = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.getAttribute("data-overlay")) {
      onClose?.();
    }
  };
  if (!open) return null;
  return createPortal(
    <div
      data-overlay
      onClick={handleClose}
      className="absolute bg-[#0000009b] w-screen h-screen left-0 top-0 flex justify-center items-center z-[100]"
    >
      <div
        className={cls(className, "relative w-[95%] p-3 rounded-md bg-[#0c0f12] h-fit")}
      >
        <div className="flex text-xl justify-between mb-4">
          <div>{title}</div>
          <div className="text-slate-500 p-3 absolute top-0 right-0" onClick={onClose}>&#x2715;</div>
        </div>
        <div className={cls(bodyClassName)}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
