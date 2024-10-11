import { useSearchStore } from "@/shared/stores";
import { WardTab } from "../enums";

export const useTabStates = () => {
  const tabType = useSearchStore((state) => state.tab);
  const isInnerScrollable = tabType === WardTab.IO;

  return {
    isInnerScrollable,
  }
}
