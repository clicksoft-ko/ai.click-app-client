import { CustomTopDialog } from "@/widgets/dialogs";
import { Button, DatePicker } from "@/widgets/ui";
import { useEffect } from "react";
import { useVsInputDialog } from "../hooks";
import { VsInputTable } from "./VsInputTable";
import { VsInputSettingsDialog } from "../../vs-input-settings/ui";
import { Settings } from "lucide-react";

interface VsInputDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: () => void;
  onRowDelete: () => void;
}

export const VsInputDialog = ({
  open,
  setOpen,
  onSave,
  onRowDelete,
}: VsInputDialogProps) => {
  const {
    date,
    setDate,
    isPending,
    data,
    emitVss,
    handleSave,
    settingsOpen,
    setSettingsOpen,
  } = useVsInputDialog({ onSave });

  useEffect(() => {
    if (open) {
      setDate(date);
      emitVss({ date });
    }
  }, [open]);

  function handleDateChange(date: Date): void {
    emitVss({ date });
    setDate(date);
  }

  return (
    <>
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
            <Button
              className="w-12 p-0 text-gray-500"
              variant="ghost"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings />
            </Button>
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
            <DatePicker value={date} onChange={handleDateChange} />
          </label>
        </div>
        <div className="overflow-auto">
          <VsInputTable originalVss={data} onRowDelete={onRowDelete} />
          <div className="h-2" />
        </div>

        {isPending && <Loading />}
      </CustomTopDialog>
      {settingsOpen && (
        <VsInputSettingsDialog open={settingsOpen} setOpen={setSettingsOpen} />
      )}
    </>
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
