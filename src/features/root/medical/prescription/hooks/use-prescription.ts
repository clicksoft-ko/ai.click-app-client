import { useInfiniteEmit } from "@/shared/hooks/socket-io";
import { usePatientStore } from "@/shared/stores";
import { useSearchStore } from "@/shared/stores/search.store";
import { MedicalTab } from "../../../enums";

export const usePrescription = () => {
  const dateRange = useSearchStore((state) => state.dateRange);
  const weib = useSearchStore((state) => state.weib);
  const tab = useSearchStore((state) => state.tab);
  const { patient } = usePatientStore();
  const enabled = tab === MedicalTab.처방 && !!patient;

  const result = useInfiniteEmit({
    path: "getPrescriptions",
    dtoFn({ page, count }) {
      return {
        count,
        page,
        chartNo: patient!.chartNo,
        startYmd: dateRange.startYmd,
        endYmd: dateRange.endYmd,
        weib,
      };
    },
    queryKey: [patient?.chartNo, weib],
    enabled,
  });

  return result;
}
