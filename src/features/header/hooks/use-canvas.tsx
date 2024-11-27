import { CanvasRef } from "@/widgets/canvas/ui/Canvas";
import { useEffect, useRef, useState } from "react";
import { SaveCanvasResult } from "..";
import { RandomUtil } from "@/shared/utils/consts";

interface Item {
  id: string | number;
  image: ArrayBuffer;
  page: number;
}

interface CanvasProps<TItem extends Item> {
  items: TItem[];
  maxPage?: number;
}

export function useCanvas<TItem extends Item>({
  items,
  maxPage = 5,
}: CanvasProps<TItem>) {
  const canvasRefs = useRef<(CanvasRef | null)[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageItems, setPageItems] = useState(items);
  const [deletedPageItems, setDeletedPageItems] = useState<TItem[]>([]);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(2);
  const [eraserWidth, setEraserWidth] = useState(7);

  const handleSave = (
    onSave: (saveResults: SaveCanvasResult[], isDeleting: boolean) => void,
  ) => {
    const imageBuffers: SaveCanvasResult[] = [];
    let currentPage: number = 0;

    for (let index = 0; index < canvasRefs.current.length; index++) {
      const canvasRef = canvasRefs.current[index];
      const imageBuffer = canvasRef?.save();
      const currentStep = canvasRef?.currentStep;

      if (imageBuffer) {
        const item = pageItems[index];

        // 새로 생성된 페이지인데 작성 안한 경우 저장하지 않음
        if (!Number.isInteger(item?.id) && currentStep === 0) {
          continue;
        }
        currentPage++;

        const isChanged = deletedPageItems.some(
          (deletedItem) => deletedItem.page === currentPage,
        );
        imageBuffers.push(
          new SaveCanvasResult(
            item?.id,
            imageBuffer,
            currentPage,
            item?.image,
            isChanged,
          ),
        );
      }
    }

    onSave(imageBuffers, deletedPageItems.length > 0);
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
    if (pageItems.length >= maxPage) return;
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

    const deletedItem = pageItems[currentPageIndex];
    if (Number.isInteger(deletedItem.id)) {
      setDeletedPageItems([...deletedPageItems, deletedItem]);
    }

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

    canvasRefs.current = [];
    setDeletedPageItems([]);
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
