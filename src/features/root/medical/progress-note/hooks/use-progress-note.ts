import { useInfiniteEmit } from "@/shared/hooks/socket-io";
import { usePatientStore } from "@/shared/stores";
import { useSearchStore } from "@/shared/stores/search.store";
import { MedicalTab } from "../../../enums";

export const useProgressNote = () => {
  const dateRange = useSearchStore((state) => state.dateRange);
  const tab = useSearchStore((state) => state.tab);
  const searchString = useSearchStore(state => state.searchString)
  const { patient } = usePatientStore();
  const enabled = tab === MedicalTab.경과 && !!patient;

  const result = useInfiniteEmit({
    path: "getProgressNotes",
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
