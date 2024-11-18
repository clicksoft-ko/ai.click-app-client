import React, { RefObject, useEffect, useImperativeHandle, useRef, useState } from "react";

export interface CanvasRef {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  save: () => void;
}

export interface CanvasProps {
  tool: "pen" | "eraser" | "brush";
  color: string;
  lineWidth: number;
  onSave: (dataUrl: string) => void;
  onLoad: (loadFn: (dataUrl: string) => void) => void;
  ref?: RefObject<CanvasRef | null>;
}

const initialCanvasSize = { width: 800, height: 600 };

export const Canvas = ({ tool, color, lineWidth, onSave, ref }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
    null,
  );

  useEffect(() => {
    // Initialize with blank canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, initialCanvasSize.width, initialCanvasSize.height);
        setHistory([canvas.toDataURL()]);
        setCurrentStep(0);
      }
    }
  }, []);

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
    if (!ctx || !lastPoint) return;

    const { x, y } = getCoordinates(e);
    const midPoint = {
      x: (lastPoint.x + x) / 2,
      y: (lastPoint.y + y) / 2,
    };

    Object.assign(ctx, {
      lineCap: "round",
      lineJoin: "round",
      strokeStyle: tool === "pen" ? color : "#ffffff",
      lineWidth: tool === "pen" ? lineWidth : lineWidth * 10,
    });

    ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, midPoint.x, midPoint.y);
    ctx.stroke();
    setLastPoint({ x, y });
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setLastPoint(null);

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const newHistory = history.slice(0, currentStep + 1);
      newHistory.push(canvas.toDataURL());
      setHistory(newHistory);
      setCurrentStep(currentStep + 1);
    }
  };

  const undo = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      const img = new Image();
      img.src = history[newStep];
      img.onload = () => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, initialCanvasSize.width, initialCanvasSize.height);
          ctx.drawImage(img, 0, 0);
        }
      };
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      const img = new Image();
      img.src = history[newStep];
      img.onload = () => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, initialCanvasSize.width, initialCanvasSize.height);
          ctx.drawImage(img, 0, 0);
        }
      };
    }
  };

  const clear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, initialCanvasSize.width, initialCanvasSize.height);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, initialCanvasSize.width, initialCanvasSize.height);
      setHistory([canvasRef.current.toDataURL()]);
      setCurrentStep(0);
    }
  };

  const save = () => {
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL());
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

  useImperativeHandle(ref, () => ({
    undo,
    redo,
    clear,
    save
  }));

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
