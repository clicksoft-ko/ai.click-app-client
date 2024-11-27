import { CanvasRef } from "@/widgets/canvas/ui/Canvas";
import { useRef, useState } from "react";

export const useCanvas = () => {
  const canvasRefs = useRef<(CanvasRef | null)[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageKeys, setPageKeys] = useState([0]);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(1);
  const [eraserWidth, setEraserWidth] = useState(10);

  const handleSave = (onSave: (imageBuffers: ArrayBuffer[]) => void) => {
    const imageBuffers: ArrayBuffer[] = [];
    for (const canvasRef of canvasRefs.current) {
      const imageBuffer = canvasRef?.save();
      if (imageBuffer) {
        imageBuffers.push(imageBuffer);
      }
    }
    onSave(imageBuffers);
  };

  const handleUndo = () => {
    canvasRefs.current[currentPageIndex]?.undo();
  };

  const handleRedo = () => {
    canvasRefs.current[currentPageIndex]?.redo();
  };

  const handleClear = () => {
    canvasRefs.current[currentPageIndex]?.clear();
  };

  const handleAddPage = () => {
    setPageKeys([...pageKeys, Math.max(...pageKeys) + 1]);
    canvasRefs.current = [...canvasRefs.current, null];
    setCurrentPageIndex(pageKeys.length);
  };

  const handleDeletePage = () => {
    if (pageKeys.length <= 1) return;

    const newPageKeys = pageKeys.filter((_, page) => page !== currentPageIndex);
    setPageKeys(newPageKeys);
    canvasRefs.current = canvasRefs.current.filter(
      (_, index) => index !== currentPageIndex,
    );
    setCurrentPageIndex(Math.min(currentPageIndex, newPageKeys.length - 1));
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < pageKeys.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  return {
    canvasRefs,
    currentPageIndex,
    pageKeys,
    tool,
    setTool,
    color,
    setColor,
    lineWidth,
    setLineWidth,
    eraserWidth,
    setEraserWidth,
    handleSave,
    handleUndo,
    handleRedo,
    handleClear,
    handleAddPage,
    handleDeletePage,
    handlePrevPage,
    handleNextPage,
  };
};
