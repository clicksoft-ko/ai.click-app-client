import { SocketErrorResponse } from "@/shared/dto/socket-io";
import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";
import { ErrorBox } from "@/widgets/errors/error-box";
import { LottiePlayer } from "@/widgets/lotties/LottiePlayer";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from "react";

interface Props extends ChildrenClassNameProps {
  error: SocketErrorResponse | undefined;
  inViewEl: JSX.Element;
  isPending: boolean;
}
export const InfiniteBodyWrapper = ({
  children,
  className,
  inViewEl,
  error,
  isPending,
}: Props) => {
  const [rect, ref] = useElementRect<HTMLDivElement>();
  console.log(rect);

  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)}>
      {children}
      <ErrorBox errorMessage={error?.message} />
      {inViewEl}
      {isPending && (
        <div
          className="fixed top-1/2 -translate-y-1/2"
          style={{
            left: `${rect.x + rect.width / 2}px`,
          }}
        >
          <LottiePlayer className="center h-24 w-24" data="loading" />
        </div>
      )}
    </div>
  );
};

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useElementRect<T extends HTMLElement>(): [Rect, React.RefObject<T | null>] {
  const [rect, setRect] = useState<Rect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const elementRef = useRef<T | null>(null);

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

      window.addEventListener('resize', updateRect);

      return () => {
        mutationObserver.disconnect();
        window.removeEventListener('resize', updateRect);
      };
    }
  }, [updateRect]);

  return [rect, elementRef];
}
