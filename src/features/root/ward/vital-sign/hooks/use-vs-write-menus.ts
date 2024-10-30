import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiPaths } from "@/shared/paths";
import { fetchVsInputSettings } from "../api";
import { useAuth } from "@/shared/hooks/auth";
import { Vs } from "@/shared/dto/socket-io";
import { useMemo } from "react";

export const useVsWriteMenus = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const queryKey = apiPaths.userSettings(user?.id ?? "");
  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchVsInputSettings(user?.id ?? ""),
    enabled: !!user?.id,
  });
  const vsWriteMenus = useMemo(() => data?.vsWriteMenus ?? [], [data]);
  const viewMenus = vsWriteMenus.map((menu) => menu.key as keyof Vs);
  function invalidate(): void {
    queryClient.invalidateQueries({
      queryKey: [queryKey],
    });
  }

  return { viewMenus, vsWriteMenus: data?.vsWriteMenus ?? [], invalidate };
};
