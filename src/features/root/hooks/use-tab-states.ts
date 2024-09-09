import { useMedicalStore } from "@/shared/stores";
import { WardTab } from "../enums";

export const useTabStates = () => {
  const tabType = useMedicalStore((state) => state.tab);
  const isInnerScrollable = tabType === WardTab.IO;

  return {
    isInnerScrollable,
  }
}
