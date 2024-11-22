import { FaPen, FaEraser, FaUndo, FaRedo, FaTrash } from "react-icons/fa";
import { cn } from "@/shared/utils";
import { CommonButton } from "./CommonButton";

interface CanvasControllerProps {
  tool: "pen" | "eraser";
  setTool: (tool: "pen" | "eraser") => void;
  color: string;
  setColor: (color: string) => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
  eraserWidth: number;
  setEraserWidth: (width: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
}

export const CanvasController = ({
  tool,
  setTool,
  color,
  setColor,
  lineWidth,
  setLineWidth,
  eraserWidth,
  setEraserWidth,
  onUndo,
  onRedo,
  onClear,
}: CanvasControllerProps) => {
  return (
    <div className={cn("flex gap-2", "xl:grid xl:grid-cols-3 xl:gap-2")}>
      <CommonButton
        onClick={() => setTool("pen")}
        className={cn(
          tool === "pen"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 hover:bg-gray-200",
        )}
      >
        <FaPen />
      </CommonButton>
      <CommonButton
        onClick={() => setTool("eraser")}
        className={cn(
          tool === "eraser"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 hover:bg-gray-200",
        )}
      >
        <FaEraser />
      </CommonButton>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-full min-w-10 cursor-pointer rounded"
        />
      </div>
      <div className="flex flex-col items-center gap-1 xl:col-span-3">
        {tool === "pen" ? (
          <>
            <span className="text-sm text-gray-600">선 굵기: {lineWidth}</span>
            <input
              type="range"
              min="1"
              max="10"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-32 xl:w-full"
            />
          </>
        ) : (
          <>
            <span className="text-sm text-gray-600">
              지우개 굵기: {eraserWidth}
            </span>
            <input
              type="range"
              min="1"
              max="50"
              value={eraserWidth}
              onChange={(e) => setEraserWidth(Number(e.target.value))}
              className="w-32"
            />
          </>
        )}
      </div>
      <CommonButton onClick={onUndo} className="bg-gray-100 hover:bg-gray-200">
        <FaUndo />
      </CommonButton>
      <CommonButton onClick={onRedo} className="bg-gray-100 hover:bg-gray-200">
        <FaRedo />
      </CommonButton>
      <CommonButton
        onClick={onClear}
        className="bg-pink-50 text-pink-500 hover:bg-pink-100"
      >
        <FaTrash />
      </CommonButton>
    </div>
  );
};
