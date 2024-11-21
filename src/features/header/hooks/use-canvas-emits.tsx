import { MedicalTab } from "@/features/root/enums";
import { useEmitWithAck } from "@/shared/hooks/socket-io";
import { usePatientStore, useSearchStore } from "@/shared/stores";
import { CanvasKind } from "@/shared/types/canvas-type";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SaveCanvasResult } from "../types/save-canvas-result";
import { SocketErrorResponse } from "@/shared/dto/socket-io";

export function useCanvasState() {
  const [date, setDate] = useState<Date>(new Date());
  const [kind, setKind] = useState<CanvasKind>("진료");
  const tab = useSearchStore((state) => state.tab) ?? "";
  const isTabMedical = tab in MedicalTab;

  useEffect(() => {
    setKind(isTabMedical ? "진료" : "병동");
  }, [isTabMedical]);

  return { date, kind, setDate, setKind };
}

interface UseCanvasEmitsProps {
  date: Date;
  kind: CanvasKind;
  onGetError: (error: SocketErrorResponse) => void;
}

export function useCanvasEmits({
  date,
  kind,
  onGetError,
}: UseCanvasEmitsProps) {
  const {
    data,
    emit: getTnoteItemsEmit,
    isPending: isGetting,
  } = useEmitWithAck("getTnoteItems", {
    onError(error) {
      toast.error(error.message);
      onGetError(error);
    },
  });
  const patient = usePatientStore((state) => state.patient);

  const { emit: deleteTnoteEmit, isPending: isDeleting } = useEmitWithAck(
    "deleteTnote",
    {
      onSuccess() {
        toast.success("삭제되었습니다.");
        loadTnoteItems();
      },
      onError(error) {
        toast.error(error.message);
      },
    },
  );

  const { emit: saveTnoteEmit, isPending: isSaving } = useEmitWithAck(
    "saveTnote",
    {
      onSuccess() {
        toast.success("저장되었습니다.");
        loadTnoteItems();
      },
      onError(error) {
        toast.error(error.message);
      },
    },
  );

  function loadTnoteItems(args?: {
    newKind?: CanvasKind;
    newDate?: Date;
  }): void {
    getTnoteItemsEmit({
      chartNo: patient!.chartNo,
      ymd: format(args?.newDate ?? date, "yyyyMMdd"),
      kind: args?.newKind ?? kind,
    });
  }

  function handleSaveImages(saveResults: SaveCanvasResult[]): void {
    saveTnoteEmit({
      kind,
      chartNo: patient!.chartNo,
      ymd: format(date, "yyyyMMdd"),
      data: saveResults.map((saveResult) => ({
        id: Number(saveResult.id),
        page: saveResult.page,
        image: saveResult.image,
        isChanged: saveResult.isChanged,
      })),
    });
  }

  return {
    data,
    deleteTnoteEmit,
    saveTnoteEmit,
    loadTnoteItems,
    handleSaveImages,
    isPending: isSaving || isDeleting || isGetting,
    isGetting,
  };
}
