import { CanvasRef } from "@/widgets/canvas/Canvas";
import { useEffect, useRef, useState } from "react";
import { SaveCanvasResult } from "..";
import { RandomUtil } from "@/shared/utils/consts";

interface Item {
  id: string | number;
  image: ArrayBuffer;
}

export function useCanvas<TItem extends Item>(items: TItem[]) {
  const canvasRefs = useRef<(CanvasRef | null)[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageItems, setPageItems] = useState(items);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(1);
  const [eraserWidth, setEraserWidth] = useState(10);

  const handleSave = (onSave: (saveResults: SaveCanvasResult[]) => void) => {
    const imageBuffers: SaveCanvasResult[] = [];
    canvasRefs.current.forEach((canvasRef, index) => {
      const imageBuffer = canvasRef?.save();
      if (imageBuffer) {
        const item = items[index];
        imageBuffers.push(
          new SaveCanvasResult(item?.id, imageBuffer, index + 1, item?.image),
        );
      }
    });
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
    setPageItems([...pageItems, { id: RandomUtil.getRandomId() } as TItem]);
    canvasRefs.current = [...canvasRefs.current, null];
    setCurrentPageIndex(pageItems.length);
  };

  const handleDeletePage = () => {
    if (pageItems.length <= 1) return;

    const newPageKeys = pageItems.filter(
      (_, page) => page !== currentPageIndex,
    );
    setPageItems(newPageKeys);
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
    if (currentPageIndex < pageItems.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  useEffect(() => {
    if (items.length == 0) {
      setPageItems([{ id: RandomUtil.getRandomId() } as TItem]);
    } else {
      setPageItems(items);
    }
    setCurrentPageIndex(0);
  }, [items]);

  return {
    canvasRefs,
    currentPageIndex,
    pageItems,
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
}
