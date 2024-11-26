import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Buffer } from "buffer";
import { cn } from "@/shared/utils/utils";

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
          ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
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
      if (disabled) return;
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
      if (disabled) return;
      if (!isDrawing || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx || !lastPoint) return;

      const { x, y } = getCoordinates(e);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.globalCompositeOperation =
        tool === "eraser" ? "destination-out" : "source-over";
      ctx.strokeStyle = tool === "eraser" ? "#000000" : color;
      ctx.lineWidth = tool === "eraser" ? lineWidth * 10 : lineWidth;

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
        setCurrentStep(0);
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
        <NoteLine lineStyle={lineStyle} canvasSize={canvasSize} />
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

const NoteLine = ({
  lineStyle,
  canvasSize,
}: {
  lineStyle: "dotted" | "solid" | "none";
  canvasSize: { width: number; height: number };
}) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-50"
      style={{
        width: canvasSize.width,
        height: canvasSize.height,
      }}
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          className={cn(
            "border-gray-300",
            index === 0 || index === 11 ? "opacity-0" : "",
          )}
          style={{
            borderStyle: lineStyle,
            borderWidth: lineStyle === "dotted" ? "3px 0 0 0" : "1px 0 0 0", // 위쪽 테두리만 설정
          }}
          key={index}
        ></div>
      ))}
    </div>
  );
};
