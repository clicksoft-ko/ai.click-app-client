import { useCurrentQueryKey } from "@/features/common/hooks";
import { useFetchUserSettings } from "@/features/common/hooks/use-fetch-user-settings";
import { Patient, Weib } from "@/shared/dto/socket-io";
import { DateRange } from "@/shared/interfaces/shadcn";
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
  const { removeQuery } = useCurrentQueryKey();
  const setDateRange = useSearchStore((state) => state.setDateRange);
  const { data } = useFetchUserSettings();

  if (!context) {
    throw new Error(
      "useSelectPatient must be used within SelectPatientProvider",
    );
  }

  function loadPatient(patient: Patient) {
    if (patient.ibYmd && data?.changeSearchDateToIbwonDate) {
      const dateRange = new DateRange(undefined, new Date());
      dateRange.startYmd = patient.ibYmd!;

      setDateRange(dateRange);
      removeQuery();
    }
    context.setSelectPatient(patient);
  }

  return { ...context, loadPatient };
};
