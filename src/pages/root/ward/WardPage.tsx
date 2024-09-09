import { WardTab } from "@/features/root/enums";
import { useTabStates } from "@/features/root/hooks";
import { SearchTabControl } from "@/features/root/ui";
import { IOSheetBody } from "@/features/root/ward/io-sheet/ui";
import { NursingRecordBody } from "@/features/root/ward/nursing-record/ui";
import { VitalSignBody } from "@/features/root/ward/vital-sign/ui";
import { useMedicalStore } from "@/shared/stores";
import { JSX, useEffect } from "react";

export const WardPage = () => {
  const tabTypes = Object.values(WardTab);
  const setTab = useMedicalStore((state) => state.setTab);
  const { isInnerScrollable } = useTabStates();

  useEffect(() => {
    setTab(WardTab.간호);
  }, []);

  const components = (
    <>
      <SearchTabControl tabTypes={tabTypes} />
      <Bodies />
    </>
  );
  return isInnerScrollable ? (
    <div className="flex h-bodyExceptHeader flex-col">{components}</div>
  ) : (
    components
  );
};

function Bodies() {
  const tabType = useMedicalStore((state) => state.tab);
  let component: JSX.Element | undefined;

  switch (tabType) {
    case WardTab.간호:
      component = <NursingRecordBody />;
      break;
    case WardTab.Vital:
      component = <VitalSignBody />;
      break;
    case WardTab.IO:
      component = <IOSheetBody />;
      break;
    // default:
    // return <PrescriptionBody />;
  }

  return <div className="my-2 overflow-auto px-2">{component}</div>;
}
