import { MedicalTab, WardTab } from "@/features/root/enums"
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { DateRange } from "../interfaces/shadcn";
import { Weib } from "../dto/socket-io";

export type TabType = MedicalTab | WardTab;
type SearchState = {
  tab?: TabType;
  weib: Weib;
  dateRange: DateRange;
  isPending: boolean;
  searchString?: {
    [key: string]: string;
  }
  selectedSaup: string;
}


type Actions = {
  setTab: (tab: TabType) => void;
  setWeib: (weib: Weib) => void;
  setDateRange: (dateRange: DateRange) => void;
  setIsPending: (isPending: boolean) => void;
  setSearchString: (tab: TabType, text: string) => void;
  setSelectedSaup: (saup: string) => void;
}

const initialState: SearchState = {
  tab: MedicalTab.처방,
  weib: Weib.입원,
  dateRange: new DateRange(),
  isPending: false,
  searchString: undefined,
  selectedSaup: "01",
}

const stateCreator: StateCreator<SearchState & Actions> = (set) => ({
  ...initialState,
  setTab: (tab) => set(() => ({ tab })),
  setWeib: (weib) => set(() => ({ weib })),
  setDateRange: (dateRange) => set(() => ({ dateRange })),
  setIsPending: (isPending) => set(() => ({ isPending })),
  setSearchString: (tab, text) => set(({ searchString }) => ({
    searchString: {
      ...searchString,
      [tab]: text,
    }
  })),
  setSelectedSaup: (saup) => set(() => ({ selectedSaup: saup })),
});

export const useSearchStore = create(devtools(stateCreator));

