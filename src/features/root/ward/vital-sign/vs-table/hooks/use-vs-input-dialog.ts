import { useEmitWithAck } from "@/shared/hooks/socket-io";
import { usePatientStore, useVsInputStore } from "@/shared/stores";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import { useVsWriterContext } from ".";

interface UseVsInputDialogProps {
  onSave: () => void;
}
export const useVsInputDialog = ({ onSave }: UseVsInputDialogProps) => {
  const vss = useVsInputStore((state) => state.vss);
  const clearVss = useVsInputStore((state) => state.clearVss);
  const { isPending, setIsPending, date, setDate } = useVsWriterContext();
  const patient = usePatientStore((state) => state.patient);

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
    onSuccess: () => {
      toast.success("저장되었습니다.");
      emitVss({ date });
      onSave?.();
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
  };
}; 