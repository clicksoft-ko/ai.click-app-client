import { ChildrenProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";

interface VsKeyboardProps extends ChildrenProps {
  showKeyboard: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export const VsKeyboardWrapper = ({
  ref,
  showKeyboard,
  children,
}: VsKeyboardProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        "fixed bottom-0 left-0 hidden w-screen",
        showKeyboard && "block",
      )}
    >
      {children}
    </div>
  );
};
