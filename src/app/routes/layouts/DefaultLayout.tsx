import { useDvh } from "@/shared/hooks";
import { SocketIOProvider } from "@/shared/providers";
import { cn } from "@/shared/utils";
import { envUtil } from "@/shared/utils/env";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  useDvh();
 
  return (
    <SocketIOProvider uri={envUtil.SOCKET_URL} use={true}>
      <div className={cn("w-full")}>
        <Outlet />
      </div>
    </SocketIOProvider>
  );
};
