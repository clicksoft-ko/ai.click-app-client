import { SocketErrorResponse } from "@/shared/dto/socket-io";
import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";
import { ErrorBox } from "@/widgets/errors/error-box";
import { LottiePlayer } from "@/widgets/lotties/LottiePlayer";

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
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {children}
      <ErrorBox errorMessage={error?.message} />
      {inViewEl}
      {isPending && <LottiePlayer className="center h-24" data="loading" />}
    </div>
  );
};
