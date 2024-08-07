import { InfiniteBodyWrapper } from "@/features/root/ui";
import { PrescriptionBox } from ".";
import { usePrescription } from "../hooks";

interface Props {}
export function PrescriptionBody({}: Props) {
  const { data, ...result } = usePrescription();

  const components = data?.map((p) => (
    <PrescriptionBox key={p.id} prescription={p} />
  ));

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
}
