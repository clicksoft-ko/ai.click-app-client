import { SocketIOProvider } from "@/shared/providers";
import { envUtil } from "@/shared/utils/env";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <SocketIOProvider uri={envUtil.SOCKET_URL} use={true}>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Outlet />
      </div>
    </SocketIOProvider>
  );
};
