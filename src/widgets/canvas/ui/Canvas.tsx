import { LineStyle } from "@/shared/stores";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useCanvasDrawing } from "../hooks/use-canvas-drawing";
import { useCanvasHistory } from "../hooks/use-canvas-history";
import { useCanvasOperations } from "../hooks/use-canvas-operations";
import { useCanvasEvents } from "../hooks/use-canvas-events";

export interface CanvasRef {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  save: () => ArrayBuffer | undefined;
  load: (dataUrl: string) => void;
  get currentStep(): number;
}

export interface CanvasProps {
  tool: "pen" | "eraser";
  color: string;
  lineWidth: number;
  canvasSize: { width: number; height: number };
  disabled: boolean;
  initialImage?: ArrayBuffer;
  lineStyle?: LineStyle;
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
    const { history, currentStep, setCurrentStep, addToHistory, setHistory } =
      useCanvasHistory();
    const {
      canvasRef,
      backgroundCanvasRef,
      save,
      load,
      loadInitialImage,
      initializeBackgroundSettingsImage,
    } = useCanvasEvents({
      canvasSize,
      setHistory,
      setCurrentStep,
      lineStyle,
    });
    const { startDrawing, draw, stopDrawing } = useCanvasDrawing({
      canvasRef,
      disabled,
      tool,
      color,
      lineWidth,
      addToHistory,
    });
    const { undo, redo, clear } = useCanvasOperations(
      canvasRef,
      canvasSize,
      history,
      currentStep,
      setCurrentStep,
    );

    useEffect(() => {
      if (initialImage) {
        loadInitialImage(initialImage);
      } else if (canvasRef.current) {
        initializeBackgroundSettingsImage();
      }
    }, [initialImage]);

    useEffect(() => {
      if (initialImage) return;
      initializeBackgroundSettingsImage();
    }, [lineStyle]);

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
      <div
        className="relative"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      >
        {/* Background canvas */}
        <CommonCanvas
          className="pointer-events-none absolute"
          ref={backgroundCanvasRef}
          canvasSize={canvasSize}
          disabled={disabled}
        />
        {/* Main canvas */}
        <CommonCanvas
          className="absolute z-10"
          ref={canvasRef}
          canvasSize={canvasSize}
          disabled={disabled}
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

interface CommonCanvasProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  canvasSize: { width: number; height: number };
  disabled: boolean;
  ref?: React.RefObject<HTMLCanvasElement | null>;
}

const CommonCanvas = ({
  ref,
  canvasSize,
  disabled,
  ...props
}: CommonCanvasProps) => {
  return (
    <canvas
      ref={ref}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{
        border: "1px solid #808080",
        touchAction: "none",
        cursor: disabled ? "not-allowed" : "",
      }}
      {...props}
    />
  );
};
