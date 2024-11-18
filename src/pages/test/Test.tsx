import { useState } from "react";
import { Canvas, CanvasRef } from "@/widgets/Canvas/Canvas";
import { useRef } from "react";
import { FaPen, FaEraser, FaUndo, FaRedo, FaTrash, FaSave } from "react-icons/fa";

export const TestPage = () => {
  const canvasRef = useRef<CanvasRef>(null);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(1);

  const handleSave = (dataUrl: string) => {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = dataUrl;
    link.click();
    link.remove();
  };

  const handleLoad = (loadFn: (dataUrl: string) => void) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        loadFn(dataUrl);
      };
      reader.readAsDataURL(file);
    };
    input.click();
    input.remove();
  };

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleRedo = () => {
    canvasRef.current?.redo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
        <button
          onClick={() => setTool("pen")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            tool === "pen"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaPen />
          펜
        </button>
        <button
          onClick={() => setTool("eraser")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            tool === "eraser"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FaEraser />
          지우개
        </button>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">선 굵기:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm text-gray-600">{lineWidth}</span>
        </div>
        <button
          onClick={handleUndo}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          <FaUndo />
          이전
        </button>
        <button
          onClick={handleRedo}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          <FaRedo />
          다음
        </button>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
        >
          <FaTrash />
          전체 지우기
        </button>
        <button
          onClick={() => canvasRef.current?.save()}
          className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors"
        >
          <FaSave />
          저장
        </button>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <Canvas
          ref={canvasRef}
          tool={tool}
          color={color}
          lineWidth={lineWidth}
          onSave={handleSave}
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
};
