import { useRef, useState } from "react";

export interface CanvasProps {
  tool: "pen" | "eraser";
  color: string;
  lineWidth: number;
  onSave: (dataUrl: string) => void;
  onLoad: (loadFn: (dataUrl: string) => void) => void;
} 

export const Canvas = ({
  tool,
  color,
  lineWidth,
  onSave,
  onLoad,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setCurrentStep(currentStep + 1);
  };

  const undo = () => {
    if (currentStep < 1) return;
    loadHistoryState(currentStep - 1);
    setCurrentStep(currentStep - 1);
  };

  const redo = () => {
    if (currentStep >= history.length - 1) return;
    loadHistoryState(currentStep + 1);
    setCurrentStep(currentStep + 1);
  };

  const loadHistoryState = (step: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = history[step];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    onSave(dataUrl);
  };

  const handleLoad = async (dataUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      saveToHistory();
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (history.length === 0) {
      const canvas = canvasRef.current;
      if (canvas) {
        setHistory([canvas.toDataURL()]);
        setCurrentStep(0);
      }
    }

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (tool === "pen") {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    } else {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = lineWidth * 10;
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = (saveToHistoryFlag: boolean = true) => {
    if (isDrawing && saveToHistoryFlag) {
      saveToHistory();
    }
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.closePath();
  };

  const handleMouseLeave = () => {
    if (isDrawing) {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.closePath();
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (tool === "pen") {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
      } else {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = lineWidth * 10;
      }
    }
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => onLoad(handleLoad)}>Load</button>
        <button onClick={undo} disabled={currentStep < 1}>
          이전
        </button>
        <button onClick={redo} disabled={currentStep >= history.length - 1}>
          다음
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          border: "1px solid black",
          cursor:
            tool === "pen"
              ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>\') 0 16, auto'
              : 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"><path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/></svg>\') 0 16, auto',
          backgroundColor: 'white',
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={() => stopDrawing(true)}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      />
    </div>
  );
};
