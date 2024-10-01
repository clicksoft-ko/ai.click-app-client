import { useDvh } from "@/shared/hooks";
import { SocketIOProvider } from "@/shared/providers";
import { cn } from "@/shared/utils";
import { envUtil } from "@/shared/utils/env";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  const [isVisible, setIsVisible] = useState(true);
  useDvh();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!isVisible)
    return <div>화면이 비활성화되어 스크린샷 시도일 수 있습니다.</div>;

  return (
    <SocketIOProvider uri={envUtil.SOCKET_URL} use={true}>
      <div className={cn("w-full")}>
        <Outlet />
      </div>
    </SocketIOProvider>
  );
};
