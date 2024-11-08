import { SocketErrorResponse } from "@/shared/dto/socket-io";
import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";
import { ErrorBox } from "@/widgets/errors/error-box";
import { Loading } from "@/widgets/loadings";
import { JSX, RefObject } from "react";

interface Props extends ChildrenClassNameProps {
  error: SocketErrorResponse | undefined;
  inViewEl: JSX.Element;
  isPending: boolean;
  ref?: RefObject<HTMLDivElement | null>;
}
export const InfiniteBodyWrapper = ({
  children,
  className,
  inViewEl,
  error,
  isPending,
}: Props) => {
  const hasChildren =
    children && (Array.isArray(children) ? children.length > 0 : true);

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-2",
        hasChildren ? "mt-2" : "",
        className,
      )}
    >
      {hasChildren
        ? children
        : !isPending && (
            <div className="flex h-full items-center justify-center">
              조회된 자료가 없습니다.
            </div>
          )}
      <ErrorBox errorMessage={error?.message} />
      {inViewEl}
      {isPending && <Loading className="bg-transparent" />}
    </div>
  );
};
