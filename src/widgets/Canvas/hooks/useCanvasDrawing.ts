import { useState } from 'react';

export const useCanvasDrawing = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) => {
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

  return {
    isDrawing,
    lastPoint,
    setIsDrawing,
    setLastPoint,
    getCoordinates,
  };
}; 