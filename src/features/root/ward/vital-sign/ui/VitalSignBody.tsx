import { InfiniteBodyWrapper } from "@/features/root/ui";
import { ValueGraphControls } from "@/widgets/recharts/ui";
import { useVitalSign } from "../hooks";
import { VitalSignBox } from "./VitalSignBox";
import { useComponents } from "@/features/root/hooks";

export const VitalSignBody = () => {
  const { data, ...result } = useVitalSign();
  const { components } = useComponents({
    data,
    element: (v) => <VitalSignBox key={v.id} {...v} />,
  });

  return (
    <>
      <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>
      <ValueGraphControls xName="writeDateFullText" items={data} />
    </>
  );
};
