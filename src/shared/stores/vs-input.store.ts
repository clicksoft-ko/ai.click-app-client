import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { Vs } from "../dto/socket-io";

type State = {
  vss: Vs[]
}

type Actions = {
  setVss: (vss: Vs[]) => void;
  setVsByRow: (rowIndex: number, columnId: keyof Vs, value: string) => void;
  resetVsByRow: (rowIndex: number) => void;
  removeVsByRow: (rowIndex: number) => void;
}

const initialState: State = {
  vss: []
}

const stateCreator: StateCreator<State & Actions> = (set) => ({
  ...initialState,
  setVss: (vss) => set(() => ({ vss })),
  resetVsByRow: (rowIndex: number) =>
    set((state) => ({
      vss: state.vss.map((v, i) => i === rowIndex ? new Vs() : v),
    })),
  removeVsByRow: (rowIndex: number) =>
    set((state) => ({
      vss: state.vss.filter((_, i) => i !== rowIndex),
    })),
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