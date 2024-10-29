import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { SearchDataHeader, SearchDataHeaderProps } from ".";
import { cn } from "@/shared/utils";

interface Props extends SearchDataHeaderProps, ChildrenClassNameProps {
  childrenClassName?: string;
  noBorder?: boolean;
  noShadow?: boolean;
  trailing?: React.ReactNode;
}

export function SearchDataBox({
  contents,
  children,
  className,
  noBorder,
  noShadow,
  childrenClassName,
  trailing,
}: Props) {
  return (
    <div
      className={cn(
        "border-primary-sm shadow-xl",
        noBorder ? "" : "border",
        noShadow ? "" : "shadow",
        className,
      )}
    >
      <SearchDataHeader contents={contents} trailing={trailing} />
      <div className={cn("whitespace-pre-wrap p-2", childrenClassName)}>
        {children}
      </div>
    </div>
  );
}
