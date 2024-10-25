import { cn } from "@/shared/utils";
import { type ReactNode } from "react";
import ReactDOM from "react-dom";

interface BackdropProps {
  open: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export const Backdrop = ({ open, onClick, children }: BackdropProps) => {
  return ReactDOM.createPortal(
    <div
      onClick={onClick}
      className={cn(
        "fixed left-0 top-0 z-[10] h-screen w-screen bg-black/30 transition-opacity",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {children}
    </div>,
    document.getElementById("top-portal")!,
  );
};
