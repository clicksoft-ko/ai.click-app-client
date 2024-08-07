import { MedicalTab } from "@/features/root/medical/enums";
import { FirstChartBody } from "@/features/root/medical/first-chart/ui";
import { PrescriptionBody } from "@/features/root/medical/prescription/ui";
import { ProgressNoteBody } from "@/features/root/medical/progress-note/ui";
import { MedicalSearchTab } from "@/features/root/medical/ui/MedicalSearchTab";
import { useMedicalStore } from "@/shared/stores/search.store";
import { useEffect } from "react";

const tabTypes = Object.values(MedicalTab);
export const MedicalPage = () => {
  const setTab = useMedicalStore((state) => state.setTab);
  const tabs = useMedicalStore((state) => state.tab);

  useEffect(() => {
    setTab(MedicalTab.처방);
  }, []);

  return (
    <>
      <MedicalSearchTab tabTypes={tabTypes} />
      <div className="overflow-auto">
        <div className="p-2">{bodies(tabs as MedicalTab)}</div>
      </div>
    </>
  );
};

function bodies(tabs: MedicalTab | undefined) {
  switch (tabs) {
    case MedicalTab.초진:
      return <FirstChartBody />;
    case MedicalTab.경과:
      return <ProgressNoteBody />;
    default:
      return <PrescriptionBody />;
  }
}
