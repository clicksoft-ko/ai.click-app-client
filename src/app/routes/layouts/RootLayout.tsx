import { SocketIOProvider } from "@/shared/providers";
import { envUtil } from "@/shared/utils/env";
import { Outlet } from "react-router-dom";
import { MainHeader } from "src/app/header";

export const RootLayout = () => {
  return (
    <SocketIOProvider uri={envUtil.SOCKET_URL} use={true}>
      <div>
        <MainHeader />
        <Outlet />
      </div>
    </SocketIOProvider>
  );
};
