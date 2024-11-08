import { Patient, Weib } from "@/shared/dto/socket-io";
import { usePatientStore, useSearchStore } from "@/shared/stores";
import { ReactNode, createContext, useContext, useState } from "react";

interface SelectPatientContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSelectPatient: (patient: Patient) => void;
}

export const SelectPatientContext = createContext<SelectPatientContextType>({
  open: false,
  setOpen: () => {},
  setSelectPatient: () => {},
});

interface SelectPatientProviderProps {
  children: ReactNode;
}

export const SelectPatientProvider = ({
  children,
}: SelectPatientProviderProps) => {
  const [open, setOpen] = useState(false);
  const setPatientInfo = usePatientStore((state) => state.setPatientInfo);
  const setGlobalWeib = useSearchStore((state) => state.setWeib);

  const setSelectPatient = (patient: Patient) => {
    setPatientInfo(patient);
    setGlobalWeib(Weib.입원);
    setOpen(false);
  };

  return (
    <SelectPatientContext.Provider value={{ open, setOpen, setSelectPatient }}>
      {children}
    </SelectPatientContext.Provider>
  );
};

export const useSelectPatient = () => {
  const context = useContext(SelectPatientContext);
  if (!context) {
    throw new Error(
      "useSelectPatient must be used within SelectPatientProvider",
    );
  }
  return context;
};
