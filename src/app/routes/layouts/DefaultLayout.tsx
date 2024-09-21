import { useDvh } from "@/shared/hooks";
import { cn } from "@/shared/utils";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  useDvh();

  return (
    <div className={cn("w-full")}>
      <Outlet />
    </div>
  );
};
