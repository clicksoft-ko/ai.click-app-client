import { useState } from "react";
import { Canvas } from "@/widgets/Canvas/Canvas";

export const TestPage = () => {
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

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTool("pen")}
          className={tool === "pen" ? "bg-gray-200" : ""}
        >
          펜
        </button>
        <button
          onClick={() => setTool("eraser")}
          className={tool === "eraser" ? "bg-gray-200" : ""}
        >
          지우개
        </button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="range"
          min="1"
          max="10"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
        />
      </div>
      <div className="p-2">
        <Canvas
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
