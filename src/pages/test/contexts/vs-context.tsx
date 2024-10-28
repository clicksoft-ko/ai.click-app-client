import { createContext, ReactNode, useState } from "react";

export interface VsContextType {
  isPending: boolean;
  setIsPending: (isPending: boolean) => void;
}

export const VsContext = createContext<VsContextType>({
  isPending: false,
  setIsPending: () => {},
});

interface VsContextProviderProps {
  children: ReactNode;
}

export const VsContextProvider = ({ children }: VsContextProviderProps) => {
  const [isPending, setIsPending] = useState(false);

  return (
    <VsContext.Provider value={{ isPending, setIsPending }}>
      {children}
    </VsContext.Provider>
  );
};
