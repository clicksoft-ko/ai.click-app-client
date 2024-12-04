import { useEffect, useState } from 'react';

interface UseCanvasDrawingProps {
  disabled: boolean;
  tool: "pen" | "eraser";
  color: string;
  lineWidth: number;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  addToHistory: (dataUrl: string) => void;
}

export const useCanvasDrawing = ({
  disabled,
  tool,
  color,
  lineWidth,
  addToHistory,
  canvasRef,
}: UseCanvasDrawingProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
    null,
  );

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e
      ? e.touches[0].clientX - rect.left
      : (e as React.MouseEvent).nativeEvent.offsetX;
    const y = "touches" in e
      ? e.touches[0].clientY - rect.top
      : (e as React.MouseEvent).nativeEvent.offsetY;

    return { x, y };
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled || !isDrawing || !canvasRef.current || !lastPoint) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalCompositeOperation =
      tool === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = tool === "eraser" ? "#000000" : color;
    ctx.lineWidth = tool === "eraser" ? lineWidth * 10 : lineWidth;

    ctx.beginPath();
    const midPointX = (lastPoint.x + coords.x) / 2;
    const midPointY = (lastPoint.y + coords.y) / 2;

    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.quadraticCurveTo(midPointX, midPointY, coords.x, coords.y);
    ctx.stroke();

    setLastPoint(coords);
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    if (!("touches" in e)) e.preventDefault();
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setLastPoint(coords);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setLastPoint(null);

    if (canvasRef.current) {
      addToHistory(canvasRef.current.toDataURL());
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

  return {
    startDrawing,
    draw,
    stopDrawing,
  };
};
