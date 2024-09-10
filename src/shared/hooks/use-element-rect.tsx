import { useCallback, useLayoutEffect, useRef, useState } from "react";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useElementRect<T extends HTMLElement>(): [
  Rect,
  React.RefObject<T | null>,
] {
  const [rect, setRect] = useState<Rect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const elementRef = useRef<T>(null);

  const updateRect = useCallback(() => {
    if (elementRef.current) {
      const newRect = elementRef.current.getBoundingClientRect();
      if (
        rect.x !== newRect.x ||
        rect.y !== newRect.y ||
        rect.width !== newRect.width ||
        rect.height !== newRect.height
      ) {
        setRect({
          x: newRect.x,
          y: newRect.y,
          width: newRect.width,
          height: newRect.height,
        });
      }
    }
  }, [rect]);

  useLayoutEffect(() => {
    if (elementRef.current) {
      updateRect();

      const mutationObserver = new MutationObserver(updateRect);

      mutationObserver.observe(elementRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });

      window.addEventListener("resize", updateRect);

      return () => {
        mutationObserver.disconnect();
        window.removeEventListener("resize", updateRect);
      };
    }
  }, [updateRect]);

  return [rect, elementRef];
}
