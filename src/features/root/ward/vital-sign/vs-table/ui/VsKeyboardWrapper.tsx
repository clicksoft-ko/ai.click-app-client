import { ChildrenProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";
import ReactDOM from "react-dom";

interface VsKeyboardProps extends ChildrenProps {
  showKeyboard: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export const VsKeyboardWrapper = ({
  ref,
  showKeyboard,
  children,
}: VsKeyboardProps) => {
  return ReactDOM.createPortal(
    <div
      ref={ref}
      className={cn(
        "fixed bottom-0 left-0 z-[100000] hidden w-screen overflow-hidden bg-white",
        showKeyboard && "block",
      )}
    >
      {children}
    </div>,
    document.getElementById("bottom-portal")!,
  );
};
