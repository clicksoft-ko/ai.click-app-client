import { WardTab } from '@/features/root/enums';
import { useInfiniteEmit } from '@/shared/hooks/socket-io';
import { useMedicalStore, usePatientStore } from '@/shared/stores';

const useInsulin = () => {
  const dateRange = useMedicalStore((state) => state.dateRange);
  const tab = useMedicalStore((state) => state.tab);
  const searchString = useMedicalStore((state) => state.searchString);
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
