import { CustomTopDialog } from "@/widgets/dialogs";
import { Button, DatePicker } from "@/widgets/ui";
import { VsInputTable } from "./VsInputTable";
import { useEmitWithAck } from "@/shared/hooks/socket-io";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useVsInputStore } from "@/shared/stores";
import { toast } from "react-hot-toast";
import { useVsContext } from "../hooks/use-vs-context";

interface VsInputDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const VsInputDialog = ({ open, setOpen }: VsInputDialogProps) => {
  const vss = useVsInputStore((state) => state.vss);
  const clearVss = useVsInputStore((state) => state.clearVss);
  const { isPending, setIsPending } = useVsContext();

  const {
    emit: getVssOfDayEmit,
    // error: getVssOfDayError,
    data,
  } = useEmitWithAck("getVssOfDay", {
    onError: (error) => {
      toast.error(error.message);
      clearVss();
    },
    onPending: setIsPending,
  });

  const { emit: saveVssOfDayEmit } = useEmitWithAck("saveVssOfDay", {
    onError: (error) => {
      toast.error(error.message);
      clearVss();
    },
    onPending: setIsPending,
  });

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

  function handleSave(): void {
    saveVssOfDayEmit({
      key: "20240808-a288be52",
      chartNo: "00017128",
      ymd: dayjs(date).format("YYYYMMDD"),
      vss,
    });
  }

  return (
    <CustomTopDialog
      className="w-fit max-w-[500px] overflow-auto"
      open={open}
      setOpen={setOpen}
    >
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          로딩중
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{"바이탈 사인 입력 화면"}</h2>
        <div className="flex gap-2">
          <Button variant="default" onClick={handleSave}>
            저장
          </Button>
          <Button
            className={isPending ? "absolute z-[51]" : ""}
            variant="destructive"
            onClick={() => setOpen(false)}
          >
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

      {isPending && <Loading />}
    </CustomTopDialog>
  );
};

const Loading = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <span className="text-lg font-medium text-gray-700 [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff]">
          잠시만 기다려주세요...
        </span>
      </div>
    </div>
  );
};
