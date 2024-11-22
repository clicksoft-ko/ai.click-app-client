import {
  GetTnoteItemsResultDto,
  SocketErrorResponse,
} from "@/shared/dto/socket-io";
import { useEmitWithAck } from "@/shared/hooks/socket-io";
import { usePatientStore, useSearchStore } from "@/shared/stores";
import { CanvasKind } from "@/shared/types/canvas-type";
import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { SaveCanvasResult } from "../types/save-canvas-result";
import { MedicalTab } from "@/features/root/enums";

export function useCanvasState() {
  const [date, setDate] = useState<Date>(new Date());
  const [kind, setKind] = useState<CanvasKind>("진료");
  const tab = useSearchStore((state) => state.tab) ?? "";
  const isTabMedical = tab in MedicalTab;

  return { date, kind, setDate, setKind, isTabMedical };
}

interface UseCanvasEmitsProps {
  date: Date;
  kind: CanvasKind;
  onGetSuccess: (data: GetTnoteItemsResultDto) => void;
  onGetError?: (error: SocketErrorResponse) => void;
}

export function useCanvasEmits({
  date,
  kind,
  onGetSuccess,
  onGetError,
}: UseCanvasEmitsProps) {
  const {
    data,
    emit: getTnoteItemsEmit,
    isPending: isGetting,
  } = useEmitWithAck("getTnoteItems", {
    onSuccess: onGetSuccess,
    onError(error) {
      toast.error(error.message);
      onGetError?.(error);
    },
  });
  const patient = usePatientStore((state) => state.patient);

  const { emit: deleteTnoteEmit, isPending: isDeleting } = useEmitWithAck(
    "deleteTnote",
    {
      onSuccess({ success, message }) {
        if (success) {
          toast.success(message);
          loadTnoteItems();
        } else {
          toast.error(message);
        }
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
    tnoteId?: number;
  }): void {
    getTnoteItemsEmit({
      tnoteId: args?.tnoteId,
      chartNo: patient!.chartNo,
      ymd: format(args?.newDate ?? date, "yyyyMMdd"),
      kind: args?.newKind ?? kind,
    });
  }

  function handleDeleteTnote(): void {
    deleteTnoteEmit({
      chartNo: patient!.chartNo,
      ymd: format(date, "yyyyMMdd"),
      kind,
    });
  }

  function handleSaveImages(
    saveResults: SaveCanvasResult[],
    isDeleting: boolean,
  ): void {
    if (
      !isDeleting &&
      (saveResults.length === 0 ||
        saveResults.every((result) => !result.isChanged))
    ) {
      toast.error("변경된 내용이 없습니다.");
      return;
    }

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
    handleDeleteTnote,
    isPending: isSaving || isDeleting || isGetting,
    isGetting,
  };
}
