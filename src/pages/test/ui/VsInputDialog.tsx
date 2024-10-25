import { CustomTopDialog } from "@/widgets/dialogs";
import { Button, DatePicker } from "@/widgets/ui";
import { VsInputTable } from "./VsInputTable";
import { useEmitWithAck } from "@/shared/hooks/socket-io";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface VsInputDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const VsInputDialog = ({ open, setOpen }: VsInputDialogProps) => {
  const {
    emit: getVssOfDayEmit,
    isPending: isGetVssOfDayPending,
    error: getVssOfDayError,
    data,
  } = useEmitWithAck("getVssOfDay", {});
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    if (open) {
      getVssOfDayEmit({
        key: "20240808-a288be52",
        ymd: dayjs(date).format("YYYYMMDD"),
        chartNo: "00017128",
      });
    }
  }, [open, date]);

  return (
    <CustomTopDialog
      className="w-fit max-w-[500px] overflow-auto"
      open={open}
      setOpen={setOpen}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{"바이탈 사인 입력 화면"}</h2>
        <div className="flex gap-2">
          <Button variant="default" onClick={() => {}}>
            저장
          </Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </div>
      </div>
      <div>
        <label className="flex w-fit items-center gap-2">
          <span>일자</span>
          <span className="w-1">:</span>
          <DatePicker value={date} onChange={setDate} />
        </label>
      </div>
      <div className="overflow-auto">
        <VsInputTable originalVss={data} />
        <div className="h-2" />
      </div>
    </CustomTopDialog>
  );
};
