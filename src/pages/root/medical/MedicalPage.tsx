import { MedicalTab } from "@/features/root/enums";
import { FirstChartBody } from "@/features/root/medical/first-chart/ui";
import LabBody from "@/features/root/medical/lab/ui/LabBody";
import { PrescriptionBody } from "@/features/root/medical/prescription/ui";
import { ProgressNoteBody } from "@/features/root/medical/progress-note/ui";
import { CarouselWrapper } from "@/features/root/ui";
import { TabType } from "@/shared/stores/search.store";
import { useMemo, JSX } from "react";

export const MedicalPage = () => {
  const slides: [TabType, JSX.Element][] = useMemo(
    () => [
      [MedicalTab.처방, <PrescriptionBody />],
      [MedicalTab.초진, <FirstChartBody />],
      [MedicalTab.경과, <ProgressNoteBody />],
      [MedicalTab.검사, <LabBody />],
    ],
    [],
  );

  return <CarouselWrapper slides={slides} defaultTab={MedicalTab.처방} />;
};
