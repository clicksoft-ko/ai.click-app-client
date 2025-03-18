import { useFetchUserSettings } from "@/features/common/hooks/use-fetch-user-settings";
import { Vs } from "@/shared/dto/socket-io";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export const useVsWriteMenus = () => {
  const queryClient = useQueryClient();
  const { data, queryKey } = useFetchUserSettings();
  const vsWriteMenus = useMemo(() => data?.vsWriteMenus ?? [], [data]);
  const viewMenus = vsWriteMenus.map((menu) => menu.key as keyof Vs);

  function invalidate(): void {
    queryClient.invalidateQueries({
      queryKey: [queryKey],
    });
  }

  return { viewMenus, vsWriteMenus: data?.vsWriteMenus ?? [], invalidate };
};
