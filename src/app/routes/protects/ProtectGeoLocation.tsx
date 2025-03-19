import { fetchGeoRange } from "@/shared/api/auth";
import { useGeoLocation } from "@/shared/hooks";
import { useAuth } from "@/shared/hooks/auth";
import { apiPaths, paths } from "@/shared/paths";
import { parseErrorMessage } from "@/shared/utils/error";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import { GeoAccessMessage } from "../ui";

export const ProtectGeoLocation = () => {
  const { user, isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const { location, isLoading, isGeoAccess } = useGeoLocation({
    use: isAuthenticated,
  });
  const isDev = import.meta.env.DEV;
  const { data, error, isPending } = useQuery({
    queryFn: () => fetchGeoRange(location!.lat, location!.lng),
    queryKey: [apiPaths.auth.geoRange(0, 0)],
    staleTime: 60,
    gcTime: 60,
    enabled: isAuthenticated && !isLoading && !!location && isGeoAccess,
  });

  if (pathname === paths.test) return <Outlet />;

  if (!isDev && !isLoading && !isGeoAccess)
    return (
      <GeoAccessMessage
        message="위치 엑세스를 허용으로 설정해주세요."
        description="엑세스 권한을 주고 다시 시도해주세요."
        showSignout={true}
      />
    );
  if (error)
    return (
      <GeoAccessMessage
        message="에러가 발생했습니다."
        description={parseErrorMessage(error)}
        showSignout={true}
      />
    );
  if (!isDev && isPending)
    return (
      <GeoAccessMessage
        message="로딩 중..."
        description="로딩 중입니다."
        showReloadButton={true}
        showSignout={true}
      />
    );
  if (isLoading || !user) return <Outlet />;
  if (!isDev && data?.message)
    return (
      <GeoAccessMessage
        message={data.message}
        description="확인 후 다시 시도해주세요."
        showSignout={true}
      />
    );

  return <Outlet />;
};
