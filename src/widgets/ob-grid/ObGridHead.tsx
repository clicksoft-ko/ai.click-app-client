import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";

export function ObGridHead({ children, className }: ChildrenClassNameProps) {
  return (
    <div className={cn("flex-center bg-blue-100 text-center", className)}>
      {children}
    </div>
  );
}
