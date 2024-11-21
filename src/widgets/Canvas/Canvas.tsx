import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Buffer } from "buffer";

export interface CanvasRef {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  save: () => ArrayBuffer | undefined;
  load: (dataUrl: string) => void;
}

export interface CanvasProps {
  tool: "pen" | "eraser" | "brush";
  color: string;
  lineWidth: number;
  canvasSize: { width: number; height: number };
  initialImage?: ArrayBuffer;
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>(
  ({ tool, color, lineWidth, canvasSize, initialImage }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
      null,
    );

    useEffect(() => {
      // Initialize with blank canvas
      if (initialImage) {
        load(
          `data:image/png;base64,${Buffer.from(initialImage).toString("base64")}`,
        );
      } else if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
          setHistory([canvas.toDataURL()]);
          setCurrentStep(0);
        }
      }
    }, [initialImage]);

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

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.strokeStyle = tool === "pen" ? color : "#ffffff";
      ctx.lineWidth = tool === "pen" ? lineWidth : lineWidth * 10;

      ctx.beginPath();

      // 곡선을 자연스럽게 만들기 위해 quadraticCurveTo를 사용
      const midPointX = (lastPoint.x + x) / 2;
      const midPointY = (lastPoint.y + y) / 2;

      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.quadraticCurveTo(midPointX, midPointY, x, y);

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
            ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
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
            ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
            ctx.drawImage(img, 0, 0);
          }
        };
      }
    };

    const clear = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
        setHistory([canvasRef.current.toDataURL()]);
        setCurrentStep(0);
      }
    };

    const save = () => {
      if (canvasRef.current) {
        return Buffer.from(
          canvasRef.current.toDataURL().split(",")[1],
          "base64",
        );
      }
    };

    const load = (dataUrl: string) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx && canvasRef.current) {
          ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
          ctx.drawImage(img, 0, 0);
          setHistory([canvasRef.current.toDataURL()]);
          setCurrentStep(0);
        }
      };
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
      save,
      load,
    }));

    return (
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          border: "1px solid #808080",
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
  },
);
