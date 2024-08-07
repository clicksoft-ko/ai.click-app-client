import { InfiniteBodyWrapper } from "@/features/root/ui";
import { NursingRecordBox } from ".";
import { useNursingRecord } from "../hooks";

export const NursingRecordBody = () => {
  const { data, ...result } = useNursingRecord();
  const components = data?.map((ns) => (
    <NursingRecordBox key={ns.id} nursingRecord={ns} />
  ));

  console.log("nur", data);

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
};
