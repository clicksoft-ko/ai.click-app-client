import { useInfiniteEmit } from "@/shared/hooks/socket-io";
import { usePatientStore } from "@/shared/stores";
import { useMedicalStore } from "@/shared/stores/search.store";
import { MedicalTab } from "../../enums";

export const usePrescription = () => {
  const dateRange = useMedicalStore((state) => state.dateRange);
  const tab = useMedicalStore((state) => state.tab);
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
      };
    },
    queryKey: [patient?.chartNo],
    enabled,
  });

  return result;
}
