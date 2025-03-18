import { useAuth } from "@/shared/hooks/auth";
import { apiPaths } from "@/shared/paths";
import { useQuery } from "@tanstack/react-query";
import { fetchUserSettings } from "../api";

const useFetchUserSettings = () => {
  const { user } = useAuth();
  const queryKey = apiPaths.userSettings(user?.id ?? "");

  const queryData = useQuery({
    queryFn: () => fetchUserSettings(user?.id ?? ""),
    queryKey: [queryKey],
    enabled: !!user?.id,
  });
  return { ...queryData, queryKey };
};

export { useFetchUserSettings };

