import { WardTab } from "@/features/root/enums";
import { CarouselWrapper } from "@/features/root/ui";
import InsulinBody from "@/features/root/ward/insulin/ui/InsulinBody";
import { IOSheetBody } from "@/features/root/ward/io-sheet/ui";
import { NursingRecordBody } from "@/features/root/ward/nursing-record/ui";
import { VitalSignBody } from "@/features/root/ward/vital-sign/ui";
import { VsWriterContextProvider } from "@/features/root/ward/vital-sign/vs-table/contexts";
import { TabType } from "@/shared/stores";
import { JSX, useMemo } from "react";

export const WardPage = () => {
  const slides: [TabType, JSX.Element][] = useMemo(
    () => [
      [WardTab.간호, <NursingRecordBody />],
      [WardTab.Vital, <VitalSignBody />],
      [WardTab.IO, <IOSheetBody />],
      [WardTab.RI, <InsulinBody />],
    ],
    [],
  );

  return (
    <VsWriterContextProvider>
      <CarouselWrapper slides={slides} defaultTab={WardTab.간호} />
    </VsWriterContextProvider>
  );
};
