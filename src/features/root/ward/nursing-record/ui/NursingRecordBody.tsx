import { InfiniteBodyWrapper } from "@/features/root/ui";
import { NursingRecordBox } from ".";
import { useNursingRecord } from "../hooks";
import { useComponents } from "@/features/root/hooks";

export const NursingRecordBody = () => {
  const { data, ...result } = useNursingRecord();
  const { components } = useComponents({
    data,
    element: (v) => <NursingRecordBox key={v.id} nursingRecord={v} />,
  });

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
};
