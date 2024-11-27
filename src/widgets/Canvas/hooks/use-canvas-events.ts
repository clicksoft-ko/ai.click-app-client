import { LineStyle } from "@/shared/stores";
import { Buffer } from "buffer";
import { useRef } from "react";

interface UseCanvasEventsProps {
  canvasSize: { width: number; height: number };
  setHistory: (history: string[]) => void;
  setCurrentStep: (currentStep: number) => void;
  lineStyle: LineStyle;
}

export const useCanvasEvents = ({
  canvasSize,
  setHistory,
  setCurrentStep,
  lineStyle,
}: UseCanvasEventsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);

  const clearBackgroundCanvas = () => {
    const bgCtx = backgroundCanvasRef.current?.getContext("2d");
    if (bgCtx && backgroundCanvasRef.current) {
      bgCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    }
  };

  const clearMainCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      setHistory([canvasRef.current.toDataURL()]);
      setCurrentStep(0);
    }
  };

  const initializeBackgroundCanvas = (dataUrl: string) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      // 배경 캔버스에 이미지 로드
      const bgCtx = backgroundCanvasRef.current?.getContext("2d");
      if (bgCtx && backgroundCanvasRef.current) {
        bgCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
        bgCtx.drawImage(img, 0, 0);
      }
    };
  };

  const initializeMainCanvas = () => {
    // 메인 캔버스 초기화
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      setHistory([canvasRef.current.toDataURL()]);
      setCurrentStep(0);
    }
  };

  const loadInitialImage = (initialImage: ArrayBuffer) => {
    load(
      `data:image/png;base64,${Buffer.from(initialImage).toString("base64")}`,
    );
  };

  const save = () => {
    if (canvasRef.current && backgroundCanvasRef.current) {
      // 임시 캔버스 생성
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvasSize.width;
      tempCanvas.height = canvasSize.height;
      const tempCtx = tempCanvas.getContext("2d");

      if (tempCtx) {
        // 흰색 배경 설정
        tempCtx.fillStyle = "#FFFFFF";
        tempCtx.fillRect(0, 0, canvasSize.width, canvasSize.height);
        // 배경 캔버스 이미지 먼저 그리기
        tempCtx.drawImage(backgroundCanvasRef.current, 0, 0);
        // 메인 캔버스 이미지 그리기
        tempCtx.drawImage(canvasRef.current, 0, 0);

        // 합쳐진 이미지를 base64로 변환하여 반환
        return Buffer.from(tempCanvas.toDataURL().split(",")[1], "base64");
      }
    }
  };

  const load = (dataUrl?: string, isSettingChanged?: boolean) => {
    if (!dataUrl) {
      clearBackgroundCanvas(); // 배경 캔버스 초기화
      if (!isSettingChanged) clearMainCanvas(); // 메인 캔버스 초기화
      return;
    }

    initializeBackgroundCanvas(dataUrl);
    if (!isSettingChanged) initializeMainCanvas();
  };

  const initializeBackgroundSettingsImage = () => {
    switch (lineStyle) {
      case "dashed":
        return load("/images/note_dashed_line.png", true);
      case "solid":
        return load("/images/note_solid_line.png", true);
      default:
        return load(undefined, true);
    }
  };

  return {
    canvasRef,
    backgroundCanvasRef,
    save,
    load,
    loadInitialImage,
    initializeBackgroundSettingsImage,
  };
};