import { useCallback } from 'react';

export const useCanvasOperations = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  canvasSize: { width: number; height: number },
  history: string[],
  currentStep: number,
  setCurrentStep: (step: number) => void,
) => {
  const undo = useCallback(() => {
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
  }, [currentStep, history, canvasSize]);

  const redo = useCallback(() => {
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
  }, [currentStep, history, canvasSize]);

  const clear = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      setCurrentStep(0);
    }
  }, [canvasSize]);

  return {
    undo,
    redo,
    clear,
  };
};