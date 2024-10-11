import { WardTab } from '@/features/root/enums';
import { useInfiniteEmit } from '@/shared/hooks/socket-io';
import { useSearchStore, usePatientStore } from '@/shared/stores';

const useInsulin = () => {
  const dateRange = useSearchStore((state) => state.dateRange);
  const tab = useSearchStore((state) => state.tab);
  const searchString = useSearchStore((state) => state.searchString);
  const { patient } = usePatientStore();
  const enabled = tab === WardTab.RI && !!patient;

  const result = useInfiniteEmit({
    path: "getInsulins",
    dtoFn({ page, count }) {
      return {
        count,
        page,
        chartNo: patient!.chartNo,
        startYmd: dateRange.startYmd,
        endYmd: dateRange.endYmd,
        searchString: searchString?.[tab ?? ""] ?? "",
      };
    },
    count: 30,
    queryKey: [patient?.chartNo],
    enabled,
  });

  return result;
}

export default useInsulin
