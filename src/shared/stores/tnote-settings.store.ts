import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type LineStyle = "none" | "dashed" | "solid";

interface TNoteSettingsState {
  lineStyle: LineStyle;
  setLineStyle: (style: LineStyle) => void;
}

export const useTNoteSettingsStore = create<TNoteSettingsState>()(
  persist(
    (set) => ({
      lineStyle: "none",
      setLineStyle: (style) => set({ lineStyle: style }),
    }),
    {
      name: "tnote-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
