import { InfiniteBodyWrapper } from "@/features/root/ui";
import { PrescriptionBox } from ".";
import { usePrescription } from "../hooks";

import { useComponents } from "@/features/root/hooks";

interface Props {}
export function PrescriptionBody({}: Props) {
  const { data, ...result } = usePrescription();
  const { components } = useComponents({
    data,
    element: (v) => <PrescriptionBox key={v.id} prescription={v} />,
  });

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
}
