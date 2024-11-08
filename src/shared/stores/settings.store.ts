import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type SettingsState = {
  defaultSearch: 'patients' | 'wards';
};

type Actions = {
  setDefaultSearch: (search: 'patients' | 'wards') => void;
  reset: () => void;
};

const initialState: SettingsState = {
  defaultSearch: 'wards'
};

const stateCreator: StateCreator<SettingsState & Actions> = (set) => ({
  ...initialState,
  setDefaultSearch: (search) => set(() => ({ defaultSearch: search })),
  reset: () => set(initialState)
});

const persistOptions = persist<SettingsState & Actions>(
  stateCreator,
  {
    name: "SettingsStore",
    storage: createJSONStorage(() => localStorage),
  }
);

export const useSettingsStore = create<SettingsState & Actions>()(
  devtools(persistOptions)
);
