import { MedicalTab } from '@/features/root/enums';
import { useInfiniteEmit } from '@/shared/hooks/socket-io';
import { useMedicalStore, usePatientStore } from '@/shared/stores';

const useConsultation = () => {
  const dateRange = useMedicalStore((state) => state.dateRange);
  const tab = useMedicalStore((state) => state.tab);
  const searchString = useMedicalStore(state => state.searchString)
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

