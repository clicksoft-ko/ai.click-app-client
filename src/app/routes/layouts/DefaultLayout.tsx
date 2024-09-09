import { useTabStates } from "@/features/root/hooks";
import { cn } from "@/shared/utils";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  const { isInnerScrollable } = useTabStates();
  return (
    <div
      className={cn(
        "min-h-screen w-full",
        isInnerScrollable ? "overflow-hidden" : "",
      )}
    >
      <Outlet />
    </div>
  );
};
