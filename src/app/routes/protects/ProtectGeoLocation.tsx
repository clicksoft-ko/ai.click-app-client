import { fetchGeoRange } from "@/shared/api/auth";
import { useGeoLocation } from "@/shared/hooks";
import { useAuth } from "@/shared/hooks/auth";
import { apiPaths } from "@/shared/paths";
import { parseErrorMessage } from "@/shared/utils/error";
import { useQuery } from "@tanstack/react-query";
import { JSX } from "react";
import { GeoAccessMessage } from "../ui";

export const ProtectGeoLocation = ({ element }: { element: JSX.Element }) => {
  const { user, isAuthenticated } = useAuth();
  const { location, isLoading, isGeoAccess } = useGeoLocation({
    use: isAuthenticated,
  });

  const { data, error, isPending } = useQuery({
    queryFn: () => fetchGeoRange(location!.lat, location!.lng),
    queryKey: [apiPaths.auth.geoRange(0, 0)],
    staleTime: 1000 * 60, // 캐시 1분
    gcTime: 1000 * 60 * 2, // 메모리 유지 2분
    enabled: isAuthenticated && !isLoading && !!location && isGeoAccess,
  });

  if (!isGeoAccess)
    return (
      <GeoAccessMessage
        message="위치 엑세스를 허용으로 설정해주세요."
        description="엑세스 권한을 주고 다시 시도해주세요."
      />
    );
  if (isPending)
    return (
      <GeoAccessMessage message="로딩 중..." description="로딩 중입니다." />
    );
  if (isLoading || !user) return element;
  if (error)
    return (
      <GeoAccessMessage
        message="에러가 발생했습니다."
        description={parseErrorMessage(error)}
      />
    );
  if (data?.message)
    return (
      <GeoAccessMessage
        message={data.message}
        description="확인 후 다시 시도해주세요."
      />
    );

  return element;
};
