import { SocketErrorResponse } from "@/shared/dto/socket-io";
import { useElementRect } from "@/shared/hooks";
import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";
import { ErrorBox } from "@/widgets/errors/error-box";
import { LottiePlayer } from "@/widgets/lotties/LottiePlayer";
import { JSX } from "react";

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

  return (
    <div ref={ref} className={cn("flex h-full flex-col gap-2 mt-2", className)}>
      {children && (Array.isArray(children) ? children.length > 0 : true) ? (
        children
      ) : (
        <div className="flex h-full items-center justify-center">
          조회된 자료가 없습니다.
        </div>
      )}
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
