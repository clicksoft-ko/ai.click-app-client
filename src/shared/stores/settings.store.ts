import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type SavedLoginId = {
  hsUserId: string;
  csUserId: string;
};
type SettingsState = {
  defaultSearch: "patients" | "wards";
  savedLoginId?: SavedLoginId;
};

type Actions = {
  setDefaultSearch: (search: "patients" | "wards") => void;
  setSavedLoginId: (savedLoginId?: SavedLoginId) => void;
  reset: () => void;
};

const initialState: SettingsState = {
  defaultSearch: "wards",
  savedLoginId: undefined,
};

const stateCreator: StateCreator<SettingsState & Actions> = (set) => ({
  ...initialState,
  setDefaultSearch: (search) => set(() => ({ defaultSearch: search })),
  setSavedLoginId: (savedLoginId) =>
    set(() => ({ savedLoginId: savedLoginId })),
  reset: () => set(initialState),
});

const persistOptions = persist<SettingsState & Actions>(stateCreator, {
  name: "SettingsStore",
  storage: createJSONStorage(() => localStorage),
});

export const useSettingsStore = create<SettingsState & Actions>()(
  devtools(persistOptions),
);
