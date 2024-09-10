import { MedicalTab } from "@/features/root/enums";
import { FirstChartBody } from "@/features/root/medical/first-chart/ui";
import { PrescriptionBody } from "@/features/root/medical/prescription/ui";
import { ProgressNoteBody } from "@/features/root/medical/progress-note/ui";
import { CarouselWrapper } from "@/features/root/ui";
import { TabType } from "@/shared/stores/search.store";
import { useMemo, JSX } from "react";

export const MedicalPage = () => {
  const slides: [TabType, JSX.Element][] = useMemo(
    () => [
      [MedicalTab.처방, <PrescriptionBody key="prescription" />],
      [MedicalTab.초진, <FirstChartBody key="prescription" />],
      [MedicalTab.경과, <ProgressNoteBody key="prescription" />],
      [MedicalTab.검사, <PrescriptionBody key="prescription2" />],
    ],
    [],
  );

  return <CarouselWrapper slides={slides} defaultTab={MedicalTab.처방} />;
};
