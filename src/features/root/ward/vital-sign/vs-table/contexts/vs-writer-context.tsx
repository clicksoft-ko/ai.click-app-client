import { createContext, ReactNode, useState } from "react";

export interface VsWriterContextType {
  isPending: boolean;
  setIsPending: (isPending: boolean) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  date: Date;
  setDate: (date: Date) => void;
}

export const VsContext = createContext<VsWriterContextType>({
  isPending: false,
  setIsPending: () => {},
  open: false,
  setOpen: () => {},
  date: new Date(),
  setDate: () => {},
});

interface VsContextProviderProps {
  children: ReactNode;
}

export const VsWriterContextProvider = ({
  children,
}: VsContextProviderProps) => {
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <VsContext.Provider
      value={{ isPending, setIsPending, open, setOpen, date, setDate }}
    >
      {children}
    </VsContext.Provider>
  );
};
