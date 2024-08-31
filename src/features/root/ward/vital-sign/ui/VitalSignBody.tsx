import { InfiniteBodyWrapper } from "@/features/root/ui";
import {
  ValueGraphControls
} from "@/widgets/recharts/ui";
import { useVitalSign } from "../hooks";
import { VitalSignBox } from "./VitalSignBox";

export const VitalSignBody = () => {
  const { data, ...result } = useVitalSign();
  const components = data?.map((vs) => <VitalSignBox key={vs.id} {...vs} />);

  return (
    <>
      <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>
      <ValueGraphControls xName="writeDateFullText" items={data} />
    </>
  );
};
