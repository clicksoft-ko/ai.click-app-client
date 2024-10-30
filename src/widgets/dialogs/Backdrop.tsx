import { ClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";
import { type ReactNode } from "react";
import ReactDOM from "react-dom";

interface BackdropProps extends ClassNameProps {
  open: boolean;
  onClick?: () => void;
  children: ReactNode;
}
export const Backdrop = ({ open, onClick, children, className }: BackdropProps) => {
  return ReactDOM.createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClick?.();
        }
      }}
      className={cn(
        "fixed left-0 top-0 z-[10] h-screen w-screen bg-black/30 transition-opacity",
        open ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
    >
      {children}
    </div>,
    document.getElementById("top-portal")!,
  );
};
