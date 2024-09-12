import { useComponents } from "@/features/root/hooks";
import { InfiniteBodyWrapper } from "@/features/root/ui";
import { useLab } from "../hooks";
import { LabBox } from "./LabBox";

const LabBody = () => {
  const { data, ...result } = useLab();
  const { components } = useComponents({
    data,
    element: (v) => <LabBox key={v.id} lab={v} />,
  });

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
};

export default LabBody;
