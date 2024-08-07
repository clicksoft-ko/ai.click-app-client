import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";

export function ObGridBody({ children, className }: ChildrenClassNameProps) {
  return (
    <div
      className={cn(
        "overflow-wrap-anywhere w-full justify-stretch overflow-hidden bg-white px-1 text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
