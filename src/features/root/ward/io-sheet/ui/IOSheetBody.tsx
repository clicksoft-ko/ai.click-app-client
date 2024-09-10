import { InfiniteBodyWrapper } from "@/features/root/ui";
import { GetIOSheetsResultDto } from "@/shared/dto/socket-io";
import { useEffect, useState } from "react";
import { useIOSheet } from "../hooks";
import { IOSheetTable } from "./IOSheetTable";

export const IOSheetBody = () => {
  const { data, ...result } = useIOSheet();
  const [datas, setDatas] = useState<GetIOSheetsResultDto>([]);

  useEffect(() => {
    if (data) {
      setDatas(data);
    }
  }, [data]);
  
  return (
    <InfiniteBodyWrapper className="w-fit" {...result}>
      <IOSheetTable data={datas} />
    </InfiniteBodyWrapper>
  );
};
