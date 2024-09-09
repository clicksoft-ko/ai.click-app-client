"use no memo";
import { InfiniteBodyWrapper } from "@/features/root/ui";
import { useIOSheet } from "../hooks";
import { IOSheetTable } from "./IOSheetTable";
import { IOSheet } from "@/shared/dto/socket-io";

export const IOSheetBody = () => {
  const { data, ...result } = useIOSheet();

  return (
    <InfiniteBodyWrapper className="w-fit" {...result}>
      <IOSheetTable data={(data ?? []) as IOSheet[]} />
    </InfiniteBodyWrapper>
  );
};
