import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";
import styles from "./ob-grid.module.scss";

interface Props extends ChildrenClassNameProps {
  gridType?: "insulin" | "textList" | "rx-order" | "rx-diagnosis" | "rx-hanbang-order";
}

export function ObGrid({ children, className, gridType }: Props) {
  return (
    <div
      className={cn(
        "grid gap-[1px] bg-blue-300 p-[1px]",
        styles[gridType ?? ""],
        className,
      )}
    >
      {children}
    </div>
  );
}
