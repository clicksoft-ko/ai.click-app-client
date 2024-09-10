import { cn } from "@/shared/utils";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <div className={cn("h-screen w-full overflow-hidden")}>
      <Outlet />
    </div>
  );
};
