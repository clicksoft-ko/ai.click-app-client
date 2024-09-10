import { useInViewEx } from "@/shared/hooks";
import { useEmitWithAck, useSocketIO } from "@/shared/hooks/socket-io";
import { ExtractDto, PathTypeKey, PathTypeMap } from "@/shared/hooks/types";
import { useMedicalStore } from "@/shared/stores/search.store";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";

interface UseInifiniteCommonArgs<TPath extends PathTypeKey> {
  path: TPath;
  queryKey: any[];
  dtoFn: ({
    page,
    count,
  }: {
    page: number;
    count: number;
  }) => ExtractDto<PathTypeMap[TPath]>;
  count?: number;
  enabled?: boolean;
}

export function useInfiniteEmit<TPath extends PathTypeKey>({
  path,
  queryKey,
  dtoFn,
  count = 20,
  enabled,
}: UseInifiniteCommonArgs<TPath>) {
  const { isConnected } = useSocketIO();
  const queryClient = useQueryClient();
  const setIsPending = useMedicalStore((state) => state.setIsPending);
  const { emit, error, isPending } = useEmitWithAck(path);

  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [path, ...queryKey],
    queryFn: ({ pageParam = 1 }) => {
      const dto = dtoFn({ page: pageParam, count });
      return emit(dto);
    },
    getNextPageParam: (last, all) => getNextPageParam(count, last, all),
    select: (data) => select(data),
    enabled: isConnected && enabled,
  });

  const { inViewEl } = useInViewEx({
    onInView: () => {
      fetchNextPage();
    },
  });

  useEffect(() => {
    setIsPending(isPending);
  }, [isPending]);

  // 탭 이동 시 쿼리 초기화 (currentTab이 아닐 시 enabled는 false)
  useEffect(() => {
    return () => {
      queryClient.resetQueries({ queryKey: [path] });
    };
  }, [enabled]);

  return { inViewEl, error, isPending, data, refetch };
}

function getNextPageParam<T>(
  pageCount: number,
  last: T | undefined,
  all: (T | undefined)[],
) {
  if (!Array.isArray(last)) return null;
  if (!last || last.length < pageCount) {
    return null;
  }

  const nextPage = Math.floor((all.flat().length - 1) / pageCount) + 2;
  return nextPage;
}

function select<T>(data: InfiniteData<T | undefined | number>) {
  return data.pages?.filter((pg) => pg !== undefined).flatMap((pg) => pg) as T;
}
