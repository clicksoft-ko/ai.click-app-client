import { useEmitWithAck } from "@/shared/hooks/socket-io";
import { usePatientStore, useVsInputStore } from "@/shared/stores";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import { useVsWriterContext } from ".";
import { useState } from "react";

interface UseVsInputDialogProps {
  onSave: () => void;
}
export const useVsInputDialog = ({ onSave }: UseVsInputDialogProps) => {
  const vss = useVsInputStore((state) => state.vss);
  const clearVss = useVsInputStore((state) => state.clearVss);
  const { isPending, setIsPending, date, setDate } = useVsWriterContext();
  const patient = usePatientStore((state) => state.patient);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const {
    emit: getVssOfDayEmit,
    data,
  } = useEmitWithAck("getVssOfDay", {
    onError: (error) => {
      toast.error(error.message);
      clearVss();
    },
    onPending: setIsPending,
  });

  const { emit: saveVssOfDayEmit } = useEmitWithAck("saveVssOfDay", {
    onSuccess: ({ success, message }) => {
      if (success) {
        toast.success("저장되었습니다.");
        emitVss({ date });
        onSave?.();
      }
      else {
        toast(message ?? "저장에 실패하였습니다.", { icon: "🚨", });
      }
    },
    onError: (error) => {
      toast.error(error.message);
      clearVss();
    },
    onPending: setIsPending,
  });

  const emitVss = ({ date }: { date: Date }) => {
    getVssOfDayEmit({
      ymd: dayjs(date).format("YYYYMMDD"),
      chartNo: patient?.chartNo ?? "",
    });
  };

  const handleSave = () => {
    const nurseMissingIndex = vss.findIndex(vs => vs.time && !vs.nurse);
    if (nurseMissingIndex > -1) {
      toast.error(`${nurseMissingIndex + 1}번째 줄의 담당간호사를 입력해주세요.`);
      return;
    }

    saveVssOfDayEmit({
      chartNo: patient?.chartNo ?? "",
      ymd: dayjs(date).format("YYYYMMDD"),
      vss,
    });
  };

  return {
    date,
    setDate,
    isPending,
    data,
    emitVss,
    handleSave,
    settingsOpen,
    setSettingsOpen,
  };
}; 