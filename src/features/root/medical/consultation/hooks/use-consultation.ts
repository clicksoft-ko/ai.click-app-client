import { MedicalTab } from '@/features/root/enums';
import { useInfiniteEmit } from '@/shared/hooks/socket-io';
import { useSearchStore, usePatientStore } from '@/shared/stores';

const useConsultation = () => {
  const dateRange = useSearchStore((state) => state.dateRange);
  const tab = useSearchStore((state) => state.tab);
  const searchString = useSearchStore(state => state.searchString)
  const { patient } = usePatientStore();
  const enabled = tab === MedicalTab.협진 && !!patient;

  const result = useInfiniteEmit({
    path: "getConsultations",
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
    queryKey: [patient?.chartNo],
    enabled,
  });

  return result;
}

export { useConsultation };

