import { TnoteHistory } from "@/shared/dto/socket-io";
import { cn } from "@/shared/utils";
import { Canvas } from "@/widgets/canvas_";
import { Loading } from "@/widgets/loadings";
import { parseISO } from "date-fns";
import { useEffect, useMemo, useRef } from "react";
import { CanvasKind } from "../../../../shared/types/canvas-type";
import { useCanvas } from "../../hooks/use-canvas";
import { useCanvasEmits, useCanvasState } from "../../hooks/use-canvas-emits";
import { CanvasController } from "./CanvasController";
import { CanvasHeader } from "./CanvasHeader";
import { NoteHistorys, NoteHistorysRef } from "./NoteHistorys";
import { PageController } from "./PageController";
import { useTNoteSettingsStore } from "@/shared/stores";

interface MemoCanvasProps {
  open: boolean;
  onClose: () => void;
  onGetSuccess: () => void;
}

export const MemoCanvas = ({
  open,
  onClose,
  onGetSuccess,
}: MemoCanvasProps) => {
  const noteHistorysRef = useRef<NoteHistorysRef>(null);
  const { date, kind, setDate, setKind, isTabMedical } = useCanvasState();
  const {
    isGetting,
    isPending,
    data,
    isDifferentUser,
    loadTnoteItems,
    handleDeleteTnote,
    handleSaveImages,
  } = useCanvasEmits({
    date,
    kind,
    onGetSuccess: () => {
      noteHistorysRef.current?.reload();
      onGetSuccess();
    },
  });

  const { items } = useMemo(
    () => ({ tnoteId: data?.tnoteId ?? 0, items: data?.items ?? [] }),
    [data],
  );

  const {
    canvasRefs,
    currentPageIndex,
    pageItems: pageItems,
    tool,
    setTool,
    color,
    setColor,
    lineWidth,
    setLineWidth,
    eraserWidth,
    setEraserWidth,
    handleSave,
    handleUndo,
    handleRedo,
    handleClear,
    handleAddPage,
    handleDeletePage,
    handlePrevPage,
    handleNextPage,
  } = useCanvas({ items });
  const lineStyle = useTNoteSettingsStore((state) => state.lineStyle);

  function handleKindChange(kind: CanvasKind): void {
    setKind(kind);
    loadTnoteItems({ newKind: kind });
  }

  function handleDateChange(date: Date): void {
    setDate(date);
    loadTnoteItems({ newDate: date });
  }

  useEffect(() => {
    if (open) {
      const kind = isTabMedical ? "진료" : "병동";
      setKind(kind);
      loadTnoteItems({ newKind: kind });
    }
  }, [open]);

  function handleSelectHistory(tnoteHistory: TnoteHistory): void {
    const newDate = parseISO(tnoteHistory.ymd);
    const newKind = tnoteHistory.kind as CanvasKind;
    loadTnoteItems({
      tnoteId: tnoteHistory.tnoteId,
      userId: tnoteHistory.userId,
      newDate,
      newKind,
    });
    setDate(newDate);
    setKind(newKind);
  }

  return (
    <div
      className={cn(
        "flex min-w-[800px] flex-col items-center rounded-lg bg-white",
        "xl:items-start",
      )}
    >
      {isGetting && (
        <Loading showCloseButton onClose={onClose} pointerEventsNone={false}>
          노트 불러오는 중...
        </Loading>
      )}
      <CanvasHeader
        kind={kind}
        date={date}
        setDate={handleDateChange}
        onSave={() => handleSave(handleSaveImages)}
        onDelete={handleDeleteTnote}
        isPending={isPending}
        isDifferentUser={isDifferentUser}
        onClose={onClose}
        onKindChange={handleKindChange}
        onReload={loadTnoteItems}
      />
      <div>
        <div
          className={cn(
            "flex w-full flex-col gap-2 pb-4",
            "xl:mr-auto xl:flex-row",
          )}
        >
          <div
            className={cn(
              "flex justify-between gap-2 px-2",
              "xl:max-w-44 xl:flex-col",
            )}
          >
            {!isDifferentUser && (
              <CanvasController
                tool={tool}
                setTool={setTool}
                color={color}
                setColor={setColor}
                lineWidth={lineWidth}
                setLineWidth={setLineWidth}
                eraserWidth={eraserWidth}
                setEraserWidth={setEraserWidth}
                onUndo={handleUndo}
                onRedo={handleRedo}
                onClear={handleClear}
              />
            )}
            <PageController
              currentPage={currentPageIndex}
              totalPages={pageItems.length}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              onAddPage={handleAddPage}
              onDeletePage={handleDeletePage}
              errorMessage={
                isDifferentUser ? "다른 사용자가 작성한 노트입니다." : undefined
              }
            />
          </div>
          {pageItems.map((pageItem, pageIndex) => (
            <div
              className="px-2"
              key={pageItem.id}
              style={{
                display: currentPageIndex === pageIndex ? "block" : "none",
              }}
            >
              <Canvas
                lineStyle={lineStyle}
                canvasSize={{ width: 780, height: 800 }}
                ref={(ref) => {
                  canvasRefs.current[pageIndex] = ref;
                }}
                disabled={isDifferentUser}
                initialImage={pageItem.image}
                tool={tool}
                color={color}
                lineWidth={tool === "pen" ? lineWidth : eraserWidth}
              />
            </div>
          ))}
          <NoteHistorys ref={noteHistorysRef} onSelect={handleSelectHistory} />
        </div>
      </div>
    </div>
  );
};
