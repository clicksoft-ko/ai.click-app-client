import { MedicalTab, WardTab } from "@/features/root/enums";
import { PathTypeKey } from "@/shared/hooks/types";
import { useSearchStore } from "@/shared/stores";
import { useQueryClient } from "@tanstack/react-query";

export const useCurrentQueryKey = () => {
  const queryClient = useQueryClient();
  const tab = useSearchStore((state) => state.tab);
  const key = queryObj[tab as keyof typeof queryObj];

  function invalidateQuery() {
    queryClient.invalidateQueries({ queryKey: [key] });
  }

  function removeQuery() {
    queryClient.removeQueries({ queryKey: [key] });
  }

  return { key, invalidateQuery, removeQuery };
};

export const queryObj: {
  [key: string]: PathTypeKey;
} = {
  [MedicalTab.처방]: "getPrescriptions",
  [MedicalTab.초진]: "getFirstCharts",
  [MedicalTab.경과]: "getProgressNotes",
  [MedicalTab.검사]: "getLabs",
  [MedicalTab.협진]: "getConsultations",

  [WardTab.간호]: "getNursingRecords",
  [WardTab.Vital]: "getVitalSigns",
  [WardTab.IO]: "getIOSheets",
  [WardTab.RI]: "getInsulins",
};