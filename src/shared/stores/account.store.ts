import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { WinAccountVerificationResultDto } from "../dto/socket-io";

type AccountState = {
  account: WinAccountVerificationResultDto | undefined;
};

type Actions = {
  setAccountInfo: (data: WinAccountVerificationResultDto) => void;
  clear: () => void;
};

const initialState: AccountState = {
  account: undefined,
};

const stateCreator: StateCreator<AccountState & Actions> = (set) => ({
  ...initialState,
  setAccountInfo: (data) =>
    set(() => ({ account: data })),
  clear: () => set(initialState),
});

const persistOptions = persist<AccountState & Actions>(
  stateCreator,
  {
    name: "AccountStore",
    storage: createJSONStorage(() => localStorage),
  }
);

export const useAccountStore = create<AccountState & Actions>()(
  devtools(persistOptions)
);
