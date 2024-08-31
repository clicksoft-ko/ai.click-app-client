import { NursingRecordBody } from "@/features/root/ward/nursing-record/ui";
import { useMedicalStore } from "@/shared/stores";
import { useEffect } from "react";
import { WardTab } from "@/features/root/enums";
import { SearchTabControl } from "@/features/root/ui";
import { VitalSignBody } from "@/features/root/ward/vital-sign/ui";

export const WardPage = () => {
  const tabTypes = Object.values(WardTab);
  const setTab = useMedicalStore((state) => state.setTab);

  useEffect(() => {
    setTab(WardTab.간호);
  }, []);

  return (
    <>
      <SearchTabControl tabTypes={tabTypes} />
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
      break;
    case WardTab.Vital:
      component = <VitalSignBody />;
      break;
    // default:
    // return <PrescriptionBody />;
  }

  return (
    <div className="overflow-auto">
      <div className="p-2">{component}</div>
    </div>
  );
}
