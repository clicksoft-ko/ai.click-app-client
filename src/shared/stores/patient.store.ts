import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { Patient } from "../dto/socket-io";

type PatientState = {
  patient: Patient | undefined;
};

type Actions = {
  setPatientInfo: (data: Patient) => void;
  clear: () => void;
};

const initialState: PatientState = {
  patient: undefined,
};

const stateCreator: StateCreator<PatientState & Actions> = (set) => ({
  ...initialState,
  setPatientInfo: (data) =>
    set(() => ({ patient: Object.assign(new Patient(), data) })),
  clear: () => set(initialState),
});

const persistOptions = persist<PatientState & Actions>(
  stateCreator,
  {
    name: "PatientStore",
    storage: createJSONStorage(() => sessionStorage),
    onRehydrateStorage: () => (state) => {
      if (state?.patient) {
        state.patient = Object.assign(new Patient(), state.patient);
      }
    },
  },
)

export const usePatientStore = create(devtools(persistOptions));
