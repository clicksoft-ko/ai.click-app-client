import { MedicalTab, WardTab } from "@/features/root/medical/enums"
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { DateRange } from "../interfaces/shadcn";

export type TabType = MedicalTab | WardTab;
type SearchState = {
  tab?: TabType;
  dateRange: DateRange;
  isPending: boolean;
  searchString?: {
    [key: string]: string;
  }
}

type Actions = {
  setTab: (tab: TabType) => void;
  setDateRange: (dateRange: DateRange) => void;
  setIsPending: (isPending: boolean) => void;
  setSearchString: (tab: TabType, text: string) => void;
}

const initialState: SearchState = {
  tab: MedicalTab.처방,
  dateRange: new DateRange(),
  isPending: false,
  searchString: undefined,
}

const stateCreator: StateCreator<SearchState & Actions> = (set) => ({
  ...initialState,
  setTab: (tab) => set(() => ({ tab })),
  setDateRange: (dateRange) => set(() => ({ dateRange })),
  setIsPending: (isPending) => set(() => ({ isPending })),
  setSearchString: (tab, text) => set(({ searchString }) => ({
    searchString: {
      ...searchString,
      [tab]: text,
    }
  })),
});

export const useMedicalStore = create(devtools(stateCreator));

