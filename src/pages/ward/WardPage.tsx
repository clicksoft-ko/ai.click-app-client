import { WardTab } from "@/features/root/medical/enums";
import { NursingRecordBody } from "@/features/root/medical/nursing-record/ui";
import { MedicalSearchTab } from "@/features/root/medical/ui";
import { useMedicalStore } from "@/shared/stores";
import { useEffect } from "react";

export const WardPage = () => {
  const tabTypes = Object.values(WardTab);
  const setTab = useMedicalStore((state) => state.setTab);

  useEffect(() => {
    setTab(WardTab.간호);
  }, []);

  return (
    <>
      <MedicalSearchTab tabTypes={tabTypes} />
      <Bodies />
    </>
  );
};

function Bodies() {
  const tabs = useMedicalStore((state) => state.tab);
  let component: JSX.Element | undefined;
  switch (tabs) {
    case WardTab.간호:
      component = <NursingRecordBody />;
    // case WardTab.IO:
    // return <ProgressNoteBody />;
    // default:
    // return <PrescriptionBody />;
  }

  return (
    <div className="overflow-auto">
      <div className="p-2">{component}</div>
    </div>
  );
}
