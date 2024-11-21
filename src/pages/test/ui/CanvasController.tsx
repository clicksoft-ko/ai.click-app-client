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
    <div
      className={cn(
        "mb-4 flex gap-2",
        "xl:grid xl:max-w-72 xl:grid-cols-2 xl:gap-4",
      )}
    >
      <CommonButton
        onClick={() => setTool("pen")}
        className={
          tool === "pen"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }
      >
        <FaPen />펜
      </CommonButton>
      <CommonButton
        onClick={() => setTool("eraser")}
        className={
          tool === "eraser"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }
      >
        <FaEraser />
        지우개 
      </CommonButton>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-full min-w-10 cursor-pointer rounded xl:h-12"
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        {tool === "pen" ? (
          <>
            <span className="text-sm text-gray-600">선 굵기: {lineWidth}</span>
            <input
              type="range"
              min="1"
              max="10"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-32"
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
        이전
      </CommonButton>
      <CommonButton onClick={onRedo} className="bg-gray-100 hover:bg-gray-200">
        <FaRedo />
        다음
      </CommonButton>
      <CommonButton
        onClick={onClear}
        className="bg-pink-50 text-pink-500 hover:bg-pink-100"
      >
        <FaTrash />
        지우기
      </CommonButton>
    </div>
  );
};
