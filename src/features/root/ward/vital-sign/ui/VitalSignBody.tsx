import { useComponents } from "@/features/root/hooks";
import { InfiniteBodyWrapper } from "@/features/root/ui";
import { WriteFloatButton } from "@/widgets/buttons";
import { ValueGraphControls } from "@/widgets/recharts/ui";
import { useVitalSign } from "../hooks";
import { useVsWriterContext } from "../vs-table/hooks";
import { VsInputDialog } from "../vs-table/ui/VsInputDialog";
import { VitalSignBox } from "./VitalSignBox";

export const VitalSignBody = () => {
  const { data, ...result } = useVitalSign();
  const { open, setOpen, setDate } = useVsWriterContext();
  const { components } = useComponents({
    data,
    element: (v) => <VitalSignBox key={v.id} {...v} />,
  });

  function handleWriteFloatButtonClick(): void {
    setDate(new Date());
    setOpen(true);
  }

  return (
    <>
      <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>
      <ValueGraphControls xName="writeDateFullText" items={data} />
      <WriteFloatButton
        onClick={handleWriteFloatButtonClick}
        style={{ top: "0.8rem", bottom: "unset" }}
      />
      <VsInputDialog
        open={open}
        setOpen={setOpen}
        onSave={result.refetch}
        onRowDelete={result.refetch}
      />
    </>
  );
};
