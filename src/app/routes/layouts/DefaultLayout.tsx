import { useDvh } from "@/shared/hooks";
import { cn } from "@/shared/utils";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  useDvh();

  return (
    <div className={cn("min-h-screen w-full overflow-hidden")}>
      <Outlet />
    </div>
  );
};
