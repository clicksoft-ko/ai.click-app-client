import { useInfiniteEmit } from "@/shared/hooks/socket-io";
import { usePatientStore } from "@/shared/stores";
import { useMedicalStore } from "@/shared/stores/search.store";
import { MedicalTab } from "../../../enums";

export const useFirstChart = () => {
  const dateRange = useMedicalStore((state) => state.dateRange);
  const tabs = useMedicalStore((state) => state.tab);
  const { patient } = usePatientStore();

  return useInfiniteEmit({
    path: "getFirstCharts",
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
    enabled: tabs === MedicalTab.초진 && !!patient,
  });
}
