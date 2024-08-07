import { ChildrenProps } from "@/shared/interfaces/props";
import { createContext, useState } from "react";

export interface VerifyState {
  hsUserId?: string;
  csUserId?: string;
  name?: string;
  bu?: string;
  part?: string;
}

export type VerifyType = {
  state: VerifyState | null;
  setVerify: (state: VerifyState) => void;
};

export const VerifyContext = createContext<VerifyType>({
  state: null,
  setVerify: () => {},
});

export const VerifyProvider = ({ children }: ChildrenProps) => {
  const [state, setState] = useState<VerifyState | null>(null);

  return (
    <VerifyContext.Provider
      value={{
        state,
        setVerify: (state) => setState(state),
      }}
    >
      {children}
    </VerifyContext.Provider>
  );
};
