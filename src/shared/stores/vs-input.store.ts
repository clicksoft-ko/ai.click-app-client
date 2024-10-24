import { Vs } from "@/pages/test/vs"
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  vss: Vs[]
}

type Actions = {
  setVss: (vss: Vs[]) => void;
  setVsByRow: (rowIndex: number, columnId: keyof Vs, value: string) => void;
}

const initialState: State = {
  vss: []
}

const stateCreator: StateCreator<State & Actions> = (set) => ({
  ...initialState,
  setVss: (vss) => set(() => ({ vss })),
  setVsByRow: (rowIndex: number, columnId: keyof Vs, value: string) =>
    set((state) => ({
      vss: state.vss.map((v, i) =>
        i === rowIndex
          ? {
            ...v,
            [columnId]: value,
          }
          : v
      ),
    })),
});

export const useVsInputStore = create(devtools(stateCreator));