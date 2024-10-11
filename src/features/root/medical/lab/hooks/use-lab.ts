import { MedicalTab } from '@/features/root/enums';
import { useInfiniteEmit } from '@/shared/hooks/socket-io';
import { useSearchStore, usePatientStore } from '@/shared/stores';

const useLab = () => {
  const dateRange = useSearchStore((state) => state.dateRange);
  const tab = useSearchStore((state) => state.tab);
  const searchString = useSearchStore(state => state.searchString)
  const { patient } = usePatientStore();
  const enabled = tab === MedicalTab.검사 && !!patient;
  const weib = useSearchStore((state) => state.weib);

  const result = useInfiniteEmit({
    path: "getLabs",
    dtoFn({ page, count }) {
      return {
        count,
        page,
        chartNo: patient!.chartNo,
        startYmd: dateRange.startYmd,
        endYmd: dateRange.endYmd,
        searchString: searchString?.[tab ?? ""] ?? "",
        weib,
      };
    },
    queryKey: [patient?.chartNo, weib],
    enabled,
  });

  return result;
}

export { useLab };

