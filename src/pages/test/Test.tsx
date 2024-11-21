import { cn } from "@/shared/utils/utils";
import { Canvas } from "@/widgets/canvas/Canvas";
import { FaSave, FaTrash } from "react-icons/fa";
import { CanvasController } from "./ui/CanvasController";
import { PageController } from "./ui/PageController";
import { useCanvas } from "./hooks/use-canvas";
import { DatePicker } from "@/widgets/ui/DatePicker";

export const TestPage = () => {
  const {
    canvasRefs,
    currentPageIndex,
    pageKeys,
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
  } = useCanvas();

  return (
    <div
      className={cn(
        "flex flex-col items-start overflow-auto rounded-lg bg-white p-4",
        "xl:items-start",
      )}
    >
      <div>
        <CanvasHeader onSave={handleSave} />
        <div
          className={cn("flex w-full flex-col gap-4", "xl:mr-auto xl:flex-row")}
        >
          <div>
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
              totalPages={pageKeys.length}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              onAddPage={handleAddPage}
              onDeletePage={handleDeletePage}
            />
          </div>
          {pageKeys.map((pageKey, pageIndex) => (
            <div
              key={pageKey}
              style={{
                display: currentPageIndex === pageIndex ? "block" : "none",
              }}
            >
              <Canvas
                canvasSize={{ width: 780, height: 800 }}
                ref={(ref) => {
                  canvasRefs.current[pageIndex] = ref;
                }}
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

interface CanvasHeaderProps {
  onSave: (callback: (imageBuffers: Buffer[]) => void) => void;
}

export const CanvasHeader = ({ onSave }: CanvasHeaderProps) => {
  function handleSaveImages(imageBuffers: Buffer[]): void {
    console.log(imageBuffers);
  }

  return (
    <div className="mb-4 flex items-center justify-between gap-4 rounded-lg bg-gray-50 p-2 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">날짜:</span>
          <DatePicker value={new Date()} toDate={new Date()} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">차트:</span>
          <span className="text-gray-900">00000001</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">수진자명:</span>
          <span className="text-gray-900">홍길동</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 rounded-md bg-red-100 px-4 py-2 text-red-600 transition-colors hover:bg-red-200">
          <FaTrash />
          삭제
        </button>
        <button
          onClick={() => onSave(handleSaveImages)}
          className="flex items-center gap-2 rounded-md bg-blue-100 px-4 py-2 text-blue-600 transition-colors hover:bg-blue-200"
        >
          <FaSave />
          저장
        </button>
      </div>
    </div>
  );
};
