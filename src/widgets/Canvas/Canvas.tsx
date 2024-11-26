import { Buffer } from "buffer";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { NoteLine } from "./NoteLine";
import { useCanvasDrawing } from "./hooks/useCanvasDrawing";
import { useCanvasHistory } from "./hooks/useCanvasHistory";
import { useCanvasOperations } from "./hooks/useCanvasOperations";

export interface CanvasRef {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  save: () => ArrayBuffer | undefined;
  load: (dataUrl: string) => void;
  get currentStep(): number;
}

export interface CanvasProps {
  tool: "pen" | "eraser" | "brush";
  color: string;
  lineWidth: number;
  canvasSize: { width: number; height: number };
  disabled: boolean;
  initialImage?: ArrayBuffer;
  lineStyle?: "dotted" | "solid" | "none";
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>(
  (
    {
      tool,
      color,
      lineWidth,
      canvasSize,
      initialImage,
      disabled,
      lineStyle = "solid",
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
    const noteLineRef = useRef<HTMLDivElement>(null);
    const { isDrawing, lastPoint, setIsDrawing, setLastPoint, getCoordinates } =
      useCanvasDrawing(canvasRef);

    const { history, currentStep, setCurrentStep, addToHistory, setHistory } =
      useCanvasHistory();

    const { undo, redo, clear } = useCanvasOperations(
      canvasRef,
      canvasSize,
      history,
      currentStep,
      setCurrentStep,
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
          ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
          setHistory([canvas.toDataURL()]);
          setCurrentStep(0);
        }
      }
    }, [initialImage]);

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

    const stopDrawing = () => {
      if (!isDrawing) return;
      setIsDrawing(false);
      setLastPoint(null);

      if (canvasRef.current) {
        addToHistory(canvasRef.current.toDataURL());
      }
    };

    const save = () => {
      if (canvasRef.current && backgroundCanvasRef.current) {
        // 임시 캔버스 생성
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvasSize.width;
        tempCanvas.height = canvasSize.height;
        const tempCtx = tempCanvas.getContext("2d");

        if (tempCtx) {
          // 배경 캔버스 이미지 먼저 그리기
          tempCtx.drawImage(backgroundCanvasRef.current, 0, 0);
          // 메인 캔버스 이미지 그리기
          tempCtx.drawImage(canvasRef.current, 0, 0);

          // 합쳐진 이미지를 base64로 변환하여 반환
          return Buffer.from(tempCanvas.toDataURL().split(",")[1], "base64");
        }
      }
    };

    const load = (dataUrl: string) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        // 배경 캔버스에 이미지 로드
        const bgCtx = backgroundCanvasRef.current?.getContext("2d");
        if (bgCtx && backgroundCanvasRef.current) {
          bgCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
          bgCtx.drawImage(img, 0, 0);
        }

        // 메인 캔버스 초기화
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx && canvasRef.current) {
          ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
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
      get currentStep() {
        return currentStep;
      },
    }));

    return (
      <div className="relative">
        <NoteLine
          ref={noteLineRef}
          lineStyle={lineStyle}
          canvasSize={canvasSize}
        />
        <canvas
          className="pointer-events-none absolute z-10"
          ref={backgroundCanvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={{
            border: "1px solid #808080",
            touchAction: "none",
            cursor: disabled ? "not-allowed" : "",
          }}
        />
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={{
            border: "1px solid #808080",
            touchAction: "none",
            cursor: disabled ? "not-allowed" : "",
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
      </div>
    );
  },
);
