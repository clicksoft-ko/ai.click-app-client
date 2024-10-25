import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { type ReactNode } from "react";
import { Backdrop } from "./Backdrop";
import { cn } from "@/shared/utils";

interface CustomDialogProps extends ChildrenClassNameProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
}

export const CustomTopDialog = ({
  open,
  children,
}: CustomDialogProps) => {
  return (
    <Backdrop open={open}>
      <div
        className={cn(
          "fixed left-0 top-header z-[20] w-screen bg-white/95 p-4 shadow-lg transition-all",
          open ? "opacity-100" : "pointer-events-none left-[-100%] opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </Backdrop>
  );
};
