import { useInfiniteEmit } from "@/shared/hooks/socket-io";
import { usePatientStore } from "@/shared/stores";
import { useSearchStore } from "@/shared/stores/search.store";
import { MedicalTab } from "../../../enums";

export const useFirstChart = () => {
  const dateRange = useSearchStore((state) => state.dateRange);
  const tabs = useSearchStore((state) => state.tab);
  const { patient } = usePatientStore();
  const weib = useSearchStore((state) => state.weib);

  return useInfiniteEmit({
    path: "getFirstCharts",
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
    enabled: tabs === MedicalTab.초진 && !!patient,
  });
}
