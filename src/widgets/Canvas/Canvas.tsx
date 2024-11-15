import React, { useEffect, useRef, useState } from "react";

export interface CanvasProps {
  tool: "pen" | "eraser" | "brush";
  color: string;
  lineWidth: number;
  onSave: (dataUrl: string) => void;
  onLoad: (loadFn: (dataUrl: string) => void) => void;
}

const initialCanvasSize = { width: 800, height: 600 };

export const Canvas = ({ tool, color, lineWidth }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
    null,
  );

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e
        ? e.touches[0].clientX - rect.left
        : (e as React.MouseEvent).nativeEvent.offsetX;
    const y =
      "touches" in e
        ? e.touches[0].clientY - rect.top
        : (e as React.MouseEvent).nativeEvent.offsetY;

    return { x, y };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!("touches" in e)) e.preventDefault();
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setLastPoint({ x, y });
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    if (lastPoint) {
      // Use quadratic curve for smooth transitions
      const midPointX = (lastPoint.x + x) / 2;
      const midPointY = (lastPoint.y + y) / 2;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = tool === "pen" ? color : "#ffffff";
      ctx.lineWidth = tool === "pen" ? lineWidth : lineWidth * 10;

      ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, midPointX, midPointY);
      ctx.stroke();
    }

    setLastPoint({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);

    // Save to history (if needed)
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const newHistory = history.slice(0, currentStep + 1);
      newHistory.push(canvas.toDataURL());
      setHistory(newHistory);
      setCurrentStep(newHistory.length - 1);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const preventTouchHold = (e: Event) => e.preventDefault();
    canvas?.addEventListener("touchstart", preventTouchHold, {
      passive: false,
    });
    canvas?.addEventListener("contextmenu", preventTouchHold);

    return () => {
      canvas?.removeEventListener("touchstart", preventTouchHold);
      canvas?.removeEventListener("contextmenu", preventTouchHold);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={initialCanvasSize.width}
      height={initialCanvasSize.height}
      style={{
        border: "1px solid black",
        touchAction: "none",
        backgroundColor: "white",
      }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      onTouchCancel={stopDrawing}
    />
  );
};
