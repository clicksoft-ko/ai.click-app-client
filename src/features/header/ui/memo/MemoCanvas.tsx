import { cn } from "@/shared/utils";
import { Canvas } from "@/widgets/canvas";
import { useEffect, useMemo } from "react";
import { CanvasKind } from "../../../../shared/types/canvas-type";
import { useCanvas } from "../../hooks/use-canvas";
import { useCanvasEmits, useCanvasState } from "../../hooks/use-canvas-emits";
import { CanvasController } from "./CanvasController";
import { CanvasHeader } from "./CanvasHeader";
import { PageController } from "./PageController";
import { Loading } from "@/widgets/loadings";

interface MemoCanvasProps {
  open: boolean;
  onClose: () => void;
}

export const MemoCanvas = ({ open, onClose }: MemoCanvasProps) => {
  const { date, kind, setDate, setKind } = useCanvasState();
  const {
    isGetting,
    isPending,
    data,
    deleteTnoteEmit,
    loadTnoteItems,
    handleSaveImages,
  } = useCanvasEmits({ date, kind, onGetError: onClose });

  const { tnoteId, items } = useMemo(
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
  } = useCanvas(items);

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
      loadTnoteItems();
    }
  }, [open]);

  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg bg-white",
        "xl:items-start",
      )}
    >
      {isGetting && (
        <Loading showCloseButton onClose={onClose} pointerEventsNone={false}>
          메모 불러오는 중...
        </Loading>
      )}
      <CanvasHeader
        kind={kind}
        date={date}
        setDate={handleDateChange}
        onSave={() => handleSave(handleSaveImages)}
        onDelete={() => deleteTnoteEmit({ tnoteId })}
        isPending={isPending}
        onClose={onClose}
        onKindChange={handleKindChange}
      />
      <div>
        <div
          className={cn("flex w-full flex-col gap-4", "xl:mr-auto xl:flex-row")}
        >
          <div
            className={cn(
              "flex justify-between gap-2 px-2",
              "xl:max-w-44 xl:flex-col",
            )}
          >
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
            <PageController
              currentPage={currentPageIndex}
              totalPages={pageItems.length}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              onAddPage={handleAddPage}
              onDeletePage={handleDeletePage}
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
                canvasSize={{ width: 780, height: 800 }}
                ref={(ref) => {
                  canvasRefs.current[pageIndex] = ref;
                }}
                initialImage={pageItem.image}
                tool={tool}
                color={color}
                lineWidth={tool === "pen" ? lineWidth : eraserWidth}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
